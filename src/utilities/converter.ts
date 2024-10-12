
export const formatPhoneNumber = (phoneNumber: string) => {
    // Remove any non-digit characters
    phoneNumber = phoneNumber.replace(/\D/g, '');

    // Format the phone number into 3-3-4 segments
    const formattedPhoneNumber = phoneNumber.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');

    return formattedPhoneNumber;
}

export function getFormattedDate(date: Date): string {
    const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', year: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

export function getRandomProviderNumber(): string {
    const prefix = "1000000001";
    // Assuming the remaining numbers can be any 4-digit number
    const min = 1000;
    const max = 9999;
    const suffix = Math.floor(Math.random() * (max - min + 1)) + min;
    return prefix + suffix.toString();
}

export function TitleCase(input: string): string {
    return input
        // Split the string into words using a regular expression that considers spaces and hyphens as delimiters
        .split(/(\s+|-)/g)
        // Map each segment (including spaces and hyphens) to process only letters
        .map(segment => {
            if (segment.match(/^[a-zA-Z]+$/)) {
                // Capitalize the first letter and make the rest lowercase
                return segment.charAt(0).toUpperCase() + segment.slice(1).toLowerCase();
            } else {
                // Keep spaces and hyphens unchanged
                return segment;
            }
        })
        // Join all segments back into a single string
        .join('');
}