import TodoList from '../artifacts/contracts/TodoList.sol/TodoList.json';

export const contractAddress = import.meta.env.VITE_CONTRACT_ADDRESS;
export const contractAbi = TodoList.abi;

export const contractConfig = {
    address: contractAddress,
    abi: TodoList.abi
}