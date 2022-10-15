let contacts = []
loadContacts()

function addContact(event) {
  event.preventDefault()
  let form = event.target

  let contact = {
    id: generateId(),
    name: form.name.value,
    phone: form.phone.value,
    emergencyContact: form.emergencyContact.checked
  }

  contacts.push(contact)
  saveContacts()
  form.reset()
}

function saveContacts() {
  window.localStorage.setItem("contactList", JSON.stringify(contacts))
  drawContacts()
  toggleAddContactForm()
}

function loadContacts() {
  let contactsData = JSON.parse(window.localStorage.getItem("contactList"))
  if (contactsData) {
    contacts = contactsData
  }
}

function drawContacts() {
  let contactTemplate = ""

  contacts.forEach(contact => {

    contactTemplate += `
      <div class="card mt-1 mb-1 ${contact.emergencyContact ? 'emergency-contact' : 'nonEmergency'}">
        <h3 class="mt-1 mb-1">${contact.name}</h3>
        <div class="d-flex space-between">
          <p>
            <i class="fa fa-fw fa-phone"></i>
            <span>${contact.phone}</span>
          </p>
          <i class="action fa fa-trash text-danger" onclick="removeContact('${contact.id}')"></i>
        </div>
      </div>`
  })

  document.getElementById("contact-list").innerHTML = contactTemplate
}

function removeContact(contactId) {
  let contactIndex = contacts.findIndex(contact => contact.id === contactId)
  if (contactId == -1) {
    throw new Error("Invalid Contact Id: " + contactId)
  }
  contacts.splice(contactIndex, 1)
  saveContacts()
}

function toggleAddContactForm() {
  let formElement = document.getElementById("new-contact-form")
  formElement.classList.toggle("hidden")
}

function generateId() {
  return Math.floor(Math.random() * 10000000) + "-" + Math.floor(Math.random() * 10000000)
}


loadContacts()
drawContacts()
