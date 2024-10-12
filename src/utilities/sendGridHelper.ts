import sgMail, { MailDataRequired } from '@sendgrid/mail';
import AzureBlobStorageHelper from './azureBlobStorageHelper';
import fs from 'fs';
import path from 'path';

class SendGridHelper {
    private static initialized = false;

    // Initialize the SendGrid client with the API key from environment variables
    static initialize() {
        if (!this.initialized) {
            const sendGridApiKey = process.env.SENDGRID_API_KEY;

            if (!sendGridApiKey) {
                throw new Error('SendGrid API Key must be defined in environment variables.');
            }

            sgMail.setApiKey(sendGridApiKey);
            this.initialized = true;
        }
    }

    /**
     * Send an email using SendGrid
     * @param to Recipient email address
     * @param subject Subject of the email
     * @param text Plain text content of the email
     * @param html HTML content of the email
     * @param attachments Optional attachments for the email
     */
    static async sendEmail(
        to: string,
        subject: string,
        text: string,
        html?: string,
        attachments?: { filename: string; url: string }[]
    ): Promise<void> {
        const attachmentData = await Promise.all(
            attachments?.map(async (attachment) => {
                const content = await AzureBlobStorageHelper.downloadFileFromUrl(attachment.url);
                return {
                    content,
                    filename: attachment.filename,
                    type: 'application/pdf',
                    disposition: 'attachment',
                };
            }) || []
        );

        const msg: MailDataRequired = {
            to,
            from: process.env.SENDGRID_FROM_EMAIL,
            subject,
            text,
            html,
            attachments: attachmentData,
        };

        try {
            await sgMail.send(msg);
            console.log('Email sent successfully');
        } catch (error) {
            console.error('Error sending email:', error);
            throw new Error('Email could not be sent.');
        }
    }

    /**
     * Send an email using SendGrid
     * @param to Recipient email address
     * @param subject Subject of the email
     * @param text Plain text content of the email
     * @param html HTML content of the email
     * @param attachments Optional attachments for the email
     */
    static async sendEmailWithFile(
        to: string,
        subject: string,
        text: string,
        html?: string,
        attachments?: { filename: string; url: string }[]
    ): Promise<void> {
        const attachmentData = await Promise.all(
            attachments?.map(async (attachment) => {
                const fileContent = await fs.promises.readFile(path.resolve(attachment.url));
                return {
                    content: fileContent.toString('base64'), // Convert file to base64 encoding for email attachment
                    filename: attachment.filename,
                    type: 'application/pdf', // Assuming PDF; adjust if necessary
                    disposition: 'attachment',
                };
            }) || []
        );

        const msg: MailDataRequired = {
            to,
            from: process.env.SENDGRID_FROM_EMAIL,
            subject,
            text,
            html,
            attachments: attachmentData,
        };

        try {
            await sgMail.send(msg);
            console.log('Email sent successfully');
        } catch (error) {
            console.error('Error sending email:', error);
            throw new Error('Email could not be sent.');
        }
    }

}



export default SendGridHelper;
