// const argv = require("yargs").argv;
// const yargs = require("yargs");
// const { hideBin } = require("yargs/helpers");

const { program } = require("commander");

const phones = require("./db/contacts");

const invokeAction = async ({ action, id, name, email, phone }) => {
  // const phoneId = String(id);

  switch (action) {
    case "list":
      const allPhones = await phones.listContacts();
      console.table(allPhones);
      break;
    case "get":
      const oneContact = await phones.getContactById(id);
      console.table(oneContact);
      break;
    case "add":
      const newContact = await phones.addContact({ name, email, phone });
      console.table(newContact);
      break;
    case "remove":
      const removeContact = await phones.removeContact(id);
      console.table(removeContact);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
};

// console.log(process.argv);
//===========================
// const actionIndex = process.argv.indexOf("--action");

// if (actionIndex !== -1) {
//   const action = process.argv[actionIndex + 1];
//   console.log(action);
//   invokeAction({ action });
// }
//=============hideBin===============
// const arr = hideBin(process.argv);

// const { argv } = yargs(arr);

// invokeAction(argv);
//===============Commander====================
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse();

const opts = program.opts();

invokeAction(opts);
