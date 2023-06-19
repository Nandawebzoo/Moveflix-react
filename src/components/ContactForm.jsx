import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Feedback from 'react-bootstrap/esm/Feedback';

function ContactForm() {
  // Define state variables for each form field
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    // Log form data to console
    console.log(`Name: ${name}\nEmail: ${email}\nMessage: ${message}`);
  };
  const formik = useFormik({
    initialValues: {
      full_name: '',
      email: '',
      password: '',
      confirm_password: '',
    },
    validationSchema: Yup.object({
      full_name: Yup.string().min(2, 'Mininum 2 characters').max(15, 'Maximum 15 characters').required('Required!'),
      email: Yup.string().email('Invalid email format').required('Required!'),
      password: Yup.string().min(8, 'Minimum 8 characters').required('Required!'),
      confirm_password: Yup.string()
        .oneOf([Yup.ref('password')], "Password's not match")
        .required('Required!'),
    }),
  });

  return (
    <div>
      <form className="contact">
        <h1>Contact Us</h1>
        <div className="form-group">
          <label for="full_name">Full Name</label>
          <input
            type="text"
            id="full_name"
            name="full_name"
            value={formik.values.full_name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.full_name && formik.touched.full_name && <p className="error">{formik.errors.full_name}</p>}
        </div>
        <div className="form-group">
          <label for="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.email && formik.touched.email && <p className="error">{formik.errors.email}</p>}
        </div>
        {/* <div className="form-group">
          <label for="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.password && formik.touched.password && <p className="error">{formik.errors.password}</p>}
        </div>
        <div className="form-group">
          <label for="confirm_password">Confirm Password</label>
          <input
            type="password"
            id="confirm_password"
            name="confirm_password"
            value={formik.values.confirm_password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.confirm_password && formik.touched.confirm_password && <p className="error">{formik.errors.confirm_password}</p>}
        </div> */}
        <div className="form-group">
          <label for="feedback">Message</label>
          <textarea className='textarea-form'
            id="feedback"
            rows="4"
            style={{ width: '100%' }}
            value={formik.values.feedback}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.feedback && formik.touched.feedback && <p className="error">{formik.errors.feedback}</p>}
        </div>

        <div className="form-group">
          <Button variant="primary">Submit</Button>
        </div>
      </form>
    </div>
  );
}

export default ContactForm;
