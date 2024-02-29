const fs = require('fs');

const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$%^&*';
let passwordCount = 0;

function generatePasswords(length, filename, password = '') {
    if (length === 0) {
        fs.appendFileSync(filename, `${password}\n`);
        passwordCount++;
        return;
    }

    for (let i = 0; i < characters.length; i++) {
        const newPassword = password + characters[i];
        generatePasswords(length - 1, filename, newPassword);
    }
}

console.log("Введите количество символов:");
process.stdin.once('data', (input) => {
    const length = parseInt(input.toString());
    console.log("Введите название файла .txt:");
    process.stdin.once('data', (input) => {
        const filename = input.toString().trim();
        generatePasswords(length, filename);

        console.log(`Сгенерировано ${passwordCount} паролей и сохранено в файл ${filename}`);
        console.log("Готово!");
        process.exit();
    });
});
