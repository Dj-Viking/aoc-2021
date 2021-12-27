"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dumpLowPointGraph = void 0;
function dumpLowPointGraph(graph) {
    for (let i = 0; i < graph.length; i++) {
        console.log(`${graph[i]}`
            .replace(/,/g, " ")
            .replace(/\s(?=\[)/g, "")
            .replace(/(?<=\])\s/g, ""));
    }
}
exports.dumpLowPointGraph = dumpLowPointGraph;
//# sourceMappingURL=dumpLowPointGraph.js.map