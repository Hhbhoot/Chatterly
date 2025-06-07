import { transporter } from "../Config/nodemailer.js";
import fs from 'fs';
import path from 'path';
const __dirname = path.resolve();
const sendMail = async (name, email, token) => {
   
const resetLink = `${process.env.DOMAIN_URL}/reset-password?token=${token}`; 
    
const htmlFilePath = path.join(__dirname, 'html', 'resetPassword.html');
const htmlTemplate = fs.readFileSync(htmlFilePath, 'utf-8');

  const emailTemplate = htmlTemplate
  .replace(/{{name}}/g, name)
  .replace(/{{reset_link}}/g, resetLink)
  .replace(/{{company_name}}/g, 'Chatterly');

 try {
    const info = await transporter.sendMail({
      from: 'Chatterly',
      to: email,
      subject: 'Reset Password',
      html: emailTemplate,
    });

     if (info.messageId) {
      return true;
    }

  } catch (error) {
     console.error('Error sending email:', error);
     return false;
  }
};

export default sendMail;
