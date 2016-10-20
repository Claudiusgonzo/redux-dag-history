const log = require("debug")("redux-dag-history:DagHistory");
import {
    IDagHistory,
    StateNameGenerator,
    StateId,
} from "../interfaces";
import DagGraph from "../DagGraph";
import {jumpLog} from "./jump";
import * as Immutable from "immutable";

export default function jumpToStateLogged<T>(stateId: StateId, history: IDagHistory<T>) {
    log("jumping w/log to state %s", stateId);
    const { graph } = history;
    const reader = new DagGraph(graph);
    const branches = reader.branchesOf(stateId);
    const branch = reader.currentBranch;

    const updateObj: any = {
        pinnedStateId: null,
        bookmarkPlaybackIndex: null,
    };

    return jumpLog(stateId, history, updateObj, writer => {
        if (branches.indexOf(branch) === -1) {
            const stateBranch = reader.branchOf(stateId);
            log("current branch %s is not present on commit %s, available are [%s] - setting current branch to %s", branch, stateId, branches.join(", "), stateBranch);
            writer.setCurrentBranch(stateBranch);
        } else {
            writer.setCommitted(branch, stateId);
        }
    });
}
