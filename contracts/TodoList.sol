// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

contract TodoList {
    struct Todo {
        uint256 id;
        address owner;
        string text;
        bool completed;
        uint256 timestamp;
        uint256 updated;
    }
    event CreteEvent(
        uint256 id,
        address indexed owner,
        string indexed text,
        uint256 indexed timestamp
    );
    event UpdateEvent(
        uint256 id,
        address indexed owner,
        string indexed text,
        uint256 indexed updated
    );
    event RemoveEvent(
        uint256 indexed id,
        address indexed owner,
        uint256 indexed timestamp
    );


    Todo[] public todos;
    uint256 private nextId; // Counter to generate unique IDs

    function createTodo(string memory _text) external {
        Todo memory todo = Todo({
            id: nextId,
            owner: msg.sender,
            text: _text,
            completed: false,
            timestamp: block.timestamp,
            updated: block.timestamp
        });
        emit CreteEvent(nextId, msg.sender, _text, block.timestamp);
        todos.push(todo);
        nextId++;
    }

    function updateTodo(uint256 _id, string memory _text) external {
        (, uint256 index) = getTodoById(_id);

        todos[index].text = _text;
        todos[index].updated = block.timestamp;
        emit UpdateEvent(nextId, msg.sender, _text, block.timestamp);
    }

    function getTodos() public view returns (Todo[] memory) {
        uint256 count = 0;
        // Count the number of todos for the user
        for (uint256 i = 0; i < todos.length; i++) {
            if (todos[i].owner == msg.sender) {
                count++;
            }
        }
        // Create a new array to hold the user's todos
        Todo[] memory userTodos = new Todo[](count);
        uint256 index = 0;

        // Populate the new array
        for (uint256 i = 0; i < todos.length; i++) {
            if (todos[i].owner == msg.sender) {
                userTodos[index] = todos[i];
                index++;
            }
        }
        return userTodos;
    }

    function toggleComplete(uint256 _id) external {
        (, uint256 index) = getTodoById(_id);
        todos[index].completed = !todos[index].completed;
    }

    function getTodoById(uint256 _id)
        private
        view
        returns (Todo memory, uint256 index)
    {
        for (uint256 i = 0; i < todos.length; i++) {
            Todo memory todo = todos[i];

            if (todo.id == _id && todo.owner == msg.sender) {
                return (todos[i], i);
            }
        }
        revert("Todo not found or unauthorized");
    }

    function removeTodo(uint256 _id) external {
        (, uint256 index) = getTodoById(_id);

        todos[index] = todos[todos.length - 1];
        todos.pop();
        emit  RemoveEvent(_id, msg.sender, block.timestamp);

    }
}
