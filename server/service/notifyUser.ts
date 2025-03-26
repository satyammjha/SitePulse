import dotenv from 'dotenv';
dotenv.config();
import nodemailer from 'nodemailer';
export const notifyUser = (email: string, url: string) => {

    console.log(`Sending email to ${email} for url: ${url}`);
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_ADDRESS,
                pass: process.env.EMAIL_PASSWORD
            }
        });

        let mailOptions = {
            from: process.env.EMAIL_ADDRESS,
            to: email,
            subject: '❗ Urgent: Website Down Alert - Immediate Attention Required',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <div style="background-color: #ffebee; padding: 20px; border-radius: 5px;">
                        <h2 style="color: #b71c1c; margin-bottom: 15px;">🚨 Website Status Alert: ${url}</h2>
                        
                        <div style="background-color: white; padding: 20px; border-radius: 5px; margin-bottom: 20px;">
                            <p style="font-size: 16px; color: #333; margin-bottom: 10px;">
                                We regret to inform you that your website is currently unavailable:
                            </p>
                            
                            <ul style="color: #666; line-height: 1.6;">
                                <li><strong>URL:</strong> ${url}</li>
                                <li><strong>Status:</strong> <span style="color: #b71c1c;">Offline</span></li>
                                <li><strong>Detection Time:</strong> ${new Date().toLocaleString()}</li>
                            </ul>
                        </div>
        
                        <div style="background-color: #fff3e0; padding: 15px; border-radius: 5px;">
                            <h3 style="color: #e65100; margin-top: 0;">Recommended Actions:</h3>
                            <ol style="color: #666; line-height: 1.6;">
                                <li>Check server status and connectivity</li>
                                <li>Verify domain/DNS configuration</li>
                                <li>Review recent deployment changes</li>
                                <li>Contact your hosting provider</li>
                            </ol>
                        </div>
        
                        <p style="margin-top: 20px; color: #666;">
                            Need assistance? <a href="mailto:${process.env.EMAIL}" style="color: #1a73e8; text-decoration: none;">Contact our support team</a>
                        </p>
                    </div>
        
                    <div style="margin-top: 20px; text-align: center; color: #999; font-size: 12px;">
                        <p>This is an automated notification from Pingit Monitoring System</p>
                        <p>Please do not reply to this system-generated email</p>
                    </div>
                </div>
            `
        };

        transporter.sendMail(mailOptions, function (error: any, info: any) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
    }
    catch (error: any) {
        console.log(error);
    }
};