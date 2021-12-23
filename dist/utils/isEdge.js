"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isEdge = void 0;
function isEdge(graph, row, col) {
    switch (true) {
        case (col === 0 || col === graph[row].length - 1) && (row === 0 || row === graph.length - 1):
            return { isEdge: true, type: "corner" };
        case (col === 0 || col === graph[row].length - 1) && (row > 0 || row === graph.length - 2):
            return { isEdge: true, type: "side" };
        case (row === 0 || row === graph.length - 1) && (col > 0 || col < graph[row].length - 1):
            return { isEdge: true, type: "top-bottom" };
    }
    return { isEdge: false, type: void 0 };
}
exports.isEdge = isEdge;
//# sourceMappingURL=isEdge.js.map