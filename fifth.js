// 1. Same Tree
function isSameTree(p, q) {
    if (!p && !q) return true;
    if (!p || !q || p.val !== q.val) return false;
    return isSameTree(p.left, q.left) && isSameTree(p.right, q.right);
}

// 2. Symmetric Tree
function isSymmetric(root) {
    function isMirror(left, right) {
        if (!left && !right) return true;
        if (!left || !right || left.val !== right.val) return false;
        return (
            isMirror(left.left, right.right) && isMirror(left.right, right.left)
        );
    }
    return isMirror(root, root);
}

// 3. Invert Binary Tree
function invertTree(root) {
    if (!root) return null;
    [root.left, root.right] = [invertTree(root.right), invertTree(root.left)];
    return root;
}

// 4. Kth Smallest Element in a BST
function kthSmallest(root, k) {
    const stack = [];
    while (true) {
        while (root) {
            stack.push(root);
            root = root.left;
        }
        root = stack.pop();
        if (--k === 0) return root.val;
        root = root.right;
    }
}

// 5. Serialize and Deserialize Binary Tree
class Codec {
    serialize(root) {
        if (!root) return "X";
        return `${root.val},${this.serialize(root.left)},${this.serialize(
            root.right
        )}`;
    }

    deserialize(data) {
        const values = data.split(",");
        function buildTree() {
            const val = values.shift();
            if (val === "X") return null;
            const node = new TreeNode(Number(val));
            node.left = buildTree();
            node.right = buildTree();
            return node;
        }
        return buildTree();
    }
}

// 6. Binary Tree Maximum Path Sum
function maxPathSum(root) {
    let maxSum = -Infinity;

    function findMaxPath(node) {
        if (!node) return 0;
        const leftMax = Math.max(findMaxPath(node.left), 0);
        const rightMax = Math.max(findMaxPath(node.right), 0);
        maxSum = Math.max(maxSum, node.val + leftMax + rightMax);
        return node.val + Math.max(leftMax, rightMax);
    }

    findMaxPath(root);
    return maxSum;
}

// 7. Binary Tree Cameras
function minCameraCover(root) {
    let cameras = 0;
    const covered = new Set([null]);

    function dfs(node, parent) {
        if (!node) return;
        dfs(node.left, node);
        dfs(node.right, node);
        if (
            (!covered.has(node.left) || !covered.has(node.right)) &&
            !covered.has(node)
        ) {
            cameras++;
            covered.add(node);
            covered.add(parent);
            covered.add(node.left);
            covered.add(node.right);
        }
    }

    dfs(root, null);
    if (!covered.has(root)) cameras++;
    return cameras;
}

// 8. Vertical Order Traversal of a Binary Tree
function verticalTraversal(root) {
    const nodes = [];
    function dfs(node, row, col) {
        if (!node) return;
        nodes.push([col, row, node.val]);
        dfs(node.left, row + 1, col - 1);
        dfs(node.right, row + 1, col + 1);
    }

    dfs(root, 0, 0);
    nodes.sort((a, b) => a[0] - b[0] || a[1] - b[1] || a[2] - b[2]);

    const result = [];
    let lastCol = -Infinity;
    for (const [col, row, val] of nodes) {
        if (col !== lastCol) {
            result.push([]);
            lastCol = col;
        }
        result[result.length - 1].push(val);
    }
    return result;
}

// 9. Recover Tree From Preorder
function recoverFromPreorder(traversal) {
    const stack = [];
    let i = 0;

    while (i < traversal.length) {
        let level = 0;
        while (traversal[i] === "-") {
            level++;
            i++;
        }

        let val = 0;
        while (i < traversal.length && traversal[i] !== "-") {
            val = val * 10 + (traversal[i] - "0");
            i++;
        }

        const node = new TreeNode(val);
        while (stack.length > level) {
            stack.pop();
        }

        if (stack.length && !stack[stack.length - 1].left) {
            stack[stack.length - 1].left = node;
        } else if (stack.length) {
            stack[stack.length - 1].right = node;
        }

        stack.push(node);
    }

    return stack[0];
}
