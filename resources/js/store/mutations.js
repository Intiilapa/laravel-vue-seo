import dataMutations from "./mutation/dataMutations";
import userMutations from "./mutation/userMutations";

let mutations = {
    ...dataMutations,
    ...userMutations,
}

export default mutations
