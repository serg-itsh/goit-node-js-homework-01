// const argv = require("yargs").argv;
// const yargs = require("yargs");
// const { hideBin } = require("yargs/helpers");

const { program } = require("commander");

const phones = require("./db/contacts");

// console.log(__dirname);

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
    case "updateById":
      const updateBook = await phones.updateById(id, {
        name,
        email,
        phone,
      });
      console.table(updateBook);
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
// // console.log(arr);
// const { argv } = yargs(arr);
// // console.log(argv);

// invokeAction(argv);
//===============Commander====================
program
  .option("-a, --action <type>")
  .option("-i, --id <type>")
  .option("-n, --name <type>")
  .option("-e, --email <type>")
  .option("-p, --phone <type>");

// program.parse(process.argv);
program.parse();

const opts = program.opts();
// console.log(opts);
invokeAction(opts);
//==================================
// invokeAction({ action: "list" });
//=================================
// invokeAction({ action: "get", id: "1" });
//=================================
// invokeAction({
//   action: "add",
//   name: "Tom Cruise",
//   email: "I_dream_of_becoming@developer.net",
//   phone: "(098) 799-1049",
// });
//=================================
// invokeAction({
//   action: "remove",
//   id: "11",
//   name: "Tom Cruise",
//   email: "I_dream_of_becoming@developer.net",
//   phone: "(098) 799-1049",
// });
//================================
// invokeAction({
//   action: "updateById",
//   id: "11",
//   name: "Tom Cruise",
//   email: "I_dream_of_becoming@developer.net",
//   phone: "(098) 799-1049",
// });
//
