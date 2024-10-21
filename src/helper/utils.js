
export function getInitials(name) {
    // Split the name by space to get first name and last name
    const [firstName, lastName] = name.split(" ");
    
    // Get the first character of both, if they exist
    const firstInitial = firstName ? firstName.charAt(0).toUpperCase() : "";
    const lastInitial = lastName ? lastName.charAt(0).toUpperCase() : "";
    
    // Return the initials concatenated
    return `${firstInitial}${lastInitial}`;
  }
  