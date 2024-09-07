// Declare html2pdf to prevent TypeScript errors
declare const html2pdf: any;

// Get form elements
const form = document.getElementById('resumeForm') as HTMLFormElement;
const previewName = document.getElementById('previewName') as HTMLElement;
const previewEmail = document.getElementById('previewEmail') as HTMLElement;
const previewExperience = document.getElementById('previewExperience') as HTMLElement;
const previewEducation = document.getElementById('previewEducation') as HTMLElement;
const previewSkills = document.getElementById('previewSkills') as HTMLElement;
const shareLink = document.getElementById('shareLink') as HTMLAnchorElement;
const clearBtn = document.getElementById('clearBtn') as HTMLButtonElement;
const downloadPDFBtn = document.getElementById('downloadPDF') as HTMLButtonElement;
const editBtn = document.getElementById('editBtn') as HTMLButtonElement;
const saveChangesBtn = document.getElementById('saveChangesBtn') as HTMLButtonElement;
const cancelEditBtn = document.getElementById('cancelEditBtn') as HTMLButtonElement;
const usernameInput = document.getElementById('username') as HTMLInputElement;

function generateUniqueURL(username: string): string {
    const baseURL = 'https://milestone5-resume-builder.vercel.app/resume.html';
    return `${baseURL}?username=${encodeURIComponent(username)}`;
}



// Load from localStorage when page loads
window.addEventListener('load', () => {
    const savedData = localStorage.getItem('resumeData');
    if (savedData) {
        const data = JSON.parse(savedData);
        (document.getElementById('fullName') as HTMLInputElement).value = data.fullName;
        (document.getElementById('email') as HTMLInputElement).value = data.email;
        (document.getElementById('experience') as HTMLTextAreaElement).value = data.experience;
        (document.getElementById('education') as HTMLTextAreaElement).value = data.education;
        (document.getElementById('skills') as HTMLTextAreaElement).value = data.skills;
        (document.getElementById('username') as HTMLInputElement).value = data.username;

        updatePreview(data);
        if (data.username) {
            const uniqueURL = generateUniqueURL(data.username);
            shareLink.href = uniqueURL;
            shareLink.innerText = `Share your resume: ${uniqueURL}`;
        }
    }
});

// Generate Resume button functionality
const generateBtn = document.getElementById('generateBtn') as HTMLButtonElement;
generateBtn.addEventListener('click', () => {
    // Enable all form inputs
    (form.querySelectorAll('input, textarea') as NodeListOf<HTMLInputElement | HTMLTextAreaElement>).forEach((element) => {
        element.disabled = false;
    });

    // Update resume preview with current form data
    updatePreview({
        fullName: (document.getElementById('fullName') as HTMLInputElement).value,
        email: (document.getElementById('email') as HTMLInputElement).value,
        experience: (document.getElementById('experience') as HTMLTextAreaElement).value,
        education: (document.getElementById('education') as HTMLTextAreaElement).value,
        skills: (document.getElementById('skills') as HTMLTextAreaElement).value,
        username: (document.getElementById('username') as HTMLInputElement).value
    });

    // Save data to localStorage
    saveData();
});

// Form submit event listener
form.addEventListener('submit', function (e) {
    e.preventDefault();
    saveData();
    updatePreview({
        fullName: (document.getElementById('fullName') as HTMLInputElement).value,
        email: (document.getElementById('email') as HTMLInputElement).value,
        experience: (document.getElementById('experience') as HTMLTextAreaElement).value,
        education: (document.getElementById('education') as HTMLTextAreaElement).value,
        skills: (document.getElementById('skills') as HTMLTextAreaElement).value,
        username: (document.getElementById('username') as HTMLInputElement).value
    });
});

// Save data to localStorage and preview
function saveData() {
    const fullName = (document.getElementById('fullName') as HTMLInputElement).value;
    const email = (document.getElementById('email') as HTMLInputElement).value;
    const experience = (document.getElementById('experience') as HTMLTextAreaElement).value;
    const education = (document.getElementById('education') as HTMLTextAreaElement).value;
    const skills = (document.getElementById('skills') as HTMLTextAreaElement).value;
    const username = (document.getElementById('username') as HTMLInputElement).value;

    // Save the data to localStorage
    const resumeData = { fullName, email, experience, education, skills, username };
    localStorage.setItem('resumeData', JSON.stringify(resumeData));
}

// Update resume preview
function updatePreview(data: { fullName: string, email: string, experience: string, education: string, skills: string, username: string }) {
    previewName.innerText = data.fullName;
    previewEmail.innerText = data.email;
    previewExperience.innerText = data.experience;
    previewEducation.innerText = data.education;
    previewSkills.innerText = data.skills;

    if (data.username) {
        const uniqueURL = generateUniqueURL(data.username);
        shareLink.href = uniqueURL;
        shareLink.innerText = `Share your resume: ${uniqueURL}`;
    }
}

// Clear button functionality
clearBtn.addEventListener('click', () => {
    form.reset();
    previewName.innerText = '';
    previewEmail.innerText = '';
    previewExperience.innerText = '';
    previewEducation.innerText = '';
    previewSkills.innerText = '';

    // Clear localStorage
    localStorage.removeItem('resumeData');
});

// PDF Download functionality
downloadPDFBtn.addEventListener('click', () => {
    const element = document.getElementById('resumePreview') as HTMLElement;

    const options = {
        margin: 0.5,
        filename: 'resume.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    html2pdf().from(element).set(options).save();
});

// Edit button functionality
editBtn.addEventListener('click', () => {
    // Show or hide buttons and inputs based on edit mode
    (form.querySelectorAll('input, textarea') as NodeListOf<HTMLInputElement | HTMLTextAreaElement>).forEach((element) => {
        element.disabled = false;
    });
    editBtn.style.display = 'none';
    saveChangesBtn.style.display = 'inline';
    cancelEditBtn.style.display = 'inline';
});

// Save Changes button functionality
saveChangesBtn.addEventListener('click', () => {
    saveData();
    updatePreview({
        fullName: (document.getElementById('fullName') as HTMLInputElement).value,
        email: (document.getElementById('email') as HTMLInputElement).value,
        experience: (document.getElementById('experience') as HTMLTextAreaElement).value,
        education: (document.getElementById('education') as HTMLTextAreaElement).value,
        skills: (document.getElementById('skills') as HTMLTextAreaElement).value,
        username: (document.getElementById('username') as HTMLInputElement).value
    });
    (form.querySelectorAll('input, textarea') as NodeListOf<HTMLInputElement | HTMLTextAreaElement>).forEach((element) => {
        element.disabled = true;
    });
    editBtn.style.display = 'inline';
    saveChangesBtn.style.display = 'none';
    cancelEditBtn.style.display = 'none';
});

// Cancel Edit button functionality
cancelEditBtn.addEventListener('click', () => {
    const savedData = localStorage.getItem('resumeData');
    if (savedData) {
        const data = JSON.parse(savedData);
        (document.getElementById('fullName') as HTMLInputElement).value = data.fullName;
        (document.getElementById('email') as HTMLInputElement).value = data.email;
        (document.getElementById('experience') as HTMLTextAreaElement).value = data.experience;
        (document.getElementById('education') as HTMLTextAreaElement).value = data.education;
        (document.getElementById('skills') as HTMLTextAreaElement).value = data.skills;
        (document.getElementById('username') as HTMLInputElement).value = data.username;

        (form.querySelectorAll('input, textarea') as NodeListOf<HTMLInputElement | HTMLTextAreaElement>).forEach((element) => {
            element.disabled = true;
        });
        editBtn.style.display = 'inline';
        saveChangesBtn.style.display;
    }

})

usernameInput.addEventListener('input', () => {
    const username = usernameInput.value;

    if (username) {
        const uniqueURL = generateUniqueURL(username);
        shareLink.href = uniqueURL;
        shareLink.innerText = `Share your resume: ${uniqueURL}`;
    } else {
        shareLink.href = '';
        shareLink.innerText = 'Enter a username to generate a shareable link';
    }
});