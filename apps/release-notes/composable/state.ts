// export const useCounter = () => useState  ("counter", () => 0);
// export const useColor = () => useState<string>("color", () => "pink");
export const useCursor = () => useState("cursor", () => "")
// export const releases = () => useState ("releases", () => "")
// import { readonly, ref } from "vue";

// export function useState(initialState: String) {
//   const state = ref(initialState);
//   const setState = (newState: String) => {
//     state.value = newState;
//   };

//   return [readonly(state), setState];
// }