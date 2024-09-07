// Declare html2pdf to prevent TypeScript errors
declare const html2pdf: any;

// Get form elements
const form = document.getElementById('resumeForm') as HTMLFormElement;
const previewName = document.getElementById('previewName') as HTMLElement;
const previewEmail = document.getElementById('previewEmail') as HTMLElement;
const previewExperience = document.getElementById('previewExperience') as HTMLElement;
const previewEducation = document.getElementById('previewEducation') as HTMLElement;
const previewSkills = document.getElementById('previewSkills') as HTMLElement;
const clearBtn = document.getElementById('clearBtn') as HTMLButtonElement;
const downloadPDFBtn = document.getElementById('downloadPDF') as HTMLButtonElement;
const editBtn = document.getElementById('editBtn') as HTMLButtonElement;
const saveChangesBtn = document.getElementById('saveChangesBtn') as HTMLButtonElement;
const cancelEditBtn = document.getElementById('cancelEditBtn') as HTMLButtonElement;

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

        updatePreview(data);
    }
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
        skills: (document.getElementById('skills') as HTMLTextAreaElement).value
    })
});

// Save data to localStorage and preview
function saveData() {
    const fullName = (document.getElementById('fullName') as HTMLInputElement).value;
    const email = (document.getElementById('email') as HTMLInputElement).value;
    const experience = (document.getElementById('experience') as HTMLTextAreaElement).value;
    const education = (document.getElementById('education') as HTMLTextAreaElement).value;
    const skills = (document.getElementById('skills') as HTMLTextAreaElement).value;

    // Save the data to localStorage
    const resumeData = { fullName, email, experience, education, skills };
    localStorage.setItem('resumeData', JSON.stringify(resumeData));
}

// Update resume preview
function updatePreview(data: { fullName: string, email: string, experience: string, education: string, skills: string }) {
    previewName.innerText = data.fullName;
    previewEmail.innerText = data.email;
    previewExperience.innerText = data.experience;
    previewEducation.innerText = data.education;
    previewSkills.innerText = data.skills;
}

// Clear button functionality
clearBtn.addEventListener('click', () => {
    form.reset();
    previewName.innerText = '';
    previewEmail.innerText = '';
    previewExperience.innerText = '';
    previewEducation.innerText = '';
    previewSkills.innerText = '';

    localStorage.removeItem('resumeData');
});


const generateBtn = document.getElementById('generateBtn') as HTMLButtonElement;
generateBtn.addEventListener('click', () => {
    // Enable all form inputs
    (form.querySelectorAll('input, textarea') as NodeListOf<HTMLInputElement | HTMLTextAreaElement>).forEach((element) => {
        element.disabled = false;
    });
})

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
    });
    (form.querySelectorAll('input, textarea') as NodeListOf<HTMLInputElement | HTMLTextAreaElement>).forEach((element) => {
        if (localStorage.getItem('resumeData')) {
            element.disabled = true;
        }
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

        (form.querySelectorAll('input, textarea') as NodeListOf<HTMLInputElement | HTMLTextAreaElement>).forEach((element) => {
            element.disabled = true;
        });
        editBtn.style.display = 'inline';
        saveChangesBtn.style.display = 'none';
        cancelEditBtn.style.display = 'none';
    }
});