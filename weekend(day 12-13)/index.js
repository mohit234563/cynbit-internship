const prompt = require('prompt-sync')(); // For taking input
const insertUser = require('./insertUser');
const fetchUsers = require('./fetchUsers');
const deleteUser = require('./deleteUser');

async function mainMenu() {
    while (true) {
        console.log(`
        1. Add User
        2. View All Users
        3. Delete User
        4. Exit
        `);
        const choice = prompt('Enter choice: ');

        switch (choice) {
            case '1':
                const name = prompt('Enter name: ');
                const email = prompt('Enter email: ');
                const age = parseInt(prompt('Enter age: '));
                await insertUser(name, email, age);
                break;
            case '2':
                await fetchUsers();
                break;
            case '3':
                const identifier = prompt('Enter user ID or email to delete: ');
                await deleteUser(identifier);
                break;
            case '4':
                console.log('Exiting...');
                process.exit();
            default:
                console.log('Invalid choice. Try again.');
        }
    }
}

mainMenu();
