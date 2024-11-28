import TodoList from '../artifacts/contracts/TodoList.sol/TodoList/TodoList.json';

export const contractAddress = process.env.VITE_CONTRACT_ADDRESS;
export const contractAbi = TodoList.abi;

export const contractConfig = {
    address: contractAddress,
    abi: TodoList.abi
}