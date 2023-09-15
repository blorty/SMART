import React, { useState } from "react";

const Contact = () => {
  const [sendMessage, setSendMessage] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    // Create a new FormData object to serialize the form data
    const formDataObject = new FormData();
    formDataObject.append("name", formData.name);
    formDataObject.append("email", formData.email);
    formDataObject.append("message", formData.message);

    // Make a POST request to your backend route /contact-me
    fetch("/contact-me", {
      method: "POST",
      body: formDataObject,
    })
      .then((response) => {
        if (response.ok) {
          // If the request is successful, set sendMessage to true
          setSendMessage(true);

          // Clear the form input fields
          setFormData({
            name: "",
            email: "",
            message: "",
          });
        } else {
          // Handle any errors here, such as displaying an error message to the user
          console.error("Error sending message:", response.statusText);
        }
      })
      .catch((error) => {
        console.error("Error sending message:", error);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Update the form data state as the user types
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className="contact">
      <h2>Contact Me</h2>
      {sendMessage ? (
        <p>Message Sent! Thank you.</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Your name.."
              value={formData.name}
              onChange={handleChange}
            />
            <label htmlFor="email">Email</label>
            <input
              type="text"
              id="email"
              name="email"
              placeholder="Your email.."
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <br />
          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            name="message"
            placeholder="Write something.."
            value={formData.message}
            onChange={handleChange}
          ></textarea>
          <button type="submit">Send Message</button>
        </form>
      )}
    </div>
  );
};

export default Contact;
