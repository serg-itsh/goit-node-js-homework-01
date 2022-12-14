const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");
const { isNullOrUndefined } = require("util");

const phonesPath = path.join(__dirname, "contacts.json");

const updateContacts = async (phones) => {
  await fs.writeFile(phonesPath, JSON.stringify(phones, null, 2));
};

const listContacts = async () => {
  const data = await fs.readFile(phonesPath);
  return JSON.parse(data);
};

const getContactById = async (id) => {
  const phones = await listContacts();
  const result = phones.find((item) => item.id === id);
  return result || null;
};

const addContact = async ({ name, email, phone }) => {
  const phones = await listContacts();
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };
  phones.push(newContact);
  await updateContacts(phones);
  return newContact;
};

const removeContact = async (id) => {
  const phones = await listContacts();
  const index = phones.findIndex((item) => item.id === id);
  if (index === -1) {
    return null;
  }
  const [result] = phones.splice(index, 1);
  await updateContacts(phones);
  return result;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
