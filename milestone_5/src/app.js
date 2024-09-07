// Get form elements
var form = document.getElementById('resumeForm');
var previewName = document.getElementById('previewName');
var previewEmail = document.getElementById('previewEmail');
var previewExperience = document.getElementById('previewExperience');
var previewEducation = document.getElementById('previewEducation');
var previewSkills = document.getElementById('previewSkills');
var shareLink = document.getElementById('shareLink');
var clearBtn = document.getElementById('clearBtn');
var downloadPDFBtn = document.getElementById('downloadPDF');
var editBtn = document.getElementById('editBtn');
var saveChangesBtn = document.getElementById('saveChangesBtn');
var cancelEditBtn = document.getElementById('cancelEditBtn');
var usernameInput = document.getElementById('username');
function generateUniqueURL(username) {
    var baseURL = 'https://milestone5-resume-builder.vercel.app/resume.html';
    return "".concat(baseURL, "?username=").concat(encodeURIComponent(username));
}
// Load from localStorage when page loads
window.addEventListener('load', function () {
    var savedData = localStorage.getItem('resumeData');
    if (savedData) {
        var data = JSON.parse(savedData);
        document.getElementById('fullName').value = data.fullName;
        document.getElementById('email').value = data.email;
        document.getElementById('experience').value = data.experience;
        document.getElementById('education').value = data.education;
        document.getElementById('skills').value = data.skills;
        document.getElementById('username').value = data.username;
        updatePreview(data);
        if (data.username) {
            var uniqueURL = generateUniqueURL(data.username);
            shareLink.href = uniqueURL;
            shareLink.innerText = "Share your resume: ".concat(uniqueURL);
        }
    }
});
// Generate Resume button functionality
var generateBtn = document.getElementById('generateBtn');
generateBtn.addEventListener('click', function () {
    // Enable all form inputs
    form.querySelectorAll('input, textarea').forEach(function (element) {
        element.disabled = false;
    });
    // Update resume preview with current form data
    updatePreview({
        fullName: document.getElementById('fullName').value,
        email: document.getElementById('email').value,
        experience: document.getElementById('experience').value,
        education: document.getElementById('education').value,
        skills: document.getElementById('skills').value,
        username: document.getElementById('username').value
    });
    // Save data to localStorage
    saveData();
});
// Form submit event listener
form.addEventListener('submit', function (e) {
    e.preventDefault();
    saveData();
    updatePreview({
        fullName: document.getElementById('fullName').value,
        email: document.getElementById('email').value,
        experience: document.getElementById('experience').value,
        education: document.getElementById('education').value,
        skills: document.getElementById('skills').value,
        username: document.getElementById('username').value
    });
});
// Save data to localStorage and preview
function saveData() {
    var fullName = document.getElementById('fullName').value;
    var email = document.getElementById('email').value;
    var experience = document.getElementById('experience').value;
    var education = document.getElementById('education').value;
    var skills = document.getElementById('skills').value;
    var username = document.getElementById('username').value;
    // Save the data to localStorage
    var resumeData = { fullName: fullName, email: email, experience: experience, education: education, skills: skills, username: username };
    localStorage.setItem('resumeData', JSON.stringify(resumeData));
}
// Update resume preview
function updatePreview(data) {
    previewName.innerText = data.fullName;
    previewEmail.innerText = data.email;
    previewExperience.innerText = data.experience;
    previewEducation.innerText = data.education;
    previewSkills.innerText = data.skills;
    if (data.username) {
        var uniqueURL = generateUniqueURL(data.username);
        shareLink.href = uniqueURL;
        shareLink.innerText = "Share your resume: ".concat(uniqueURL);
    }
}
// Clear button functionality
clearBtn.addEventListener('click', function () {
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
downloadPDFBtn.addEventListener('click', function () {
    var element = document.getElementById('resumePreview');
    var options = {
        margin: 0.5,
        filename: 'resume.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };
    html2pdf().from(element).set(options).save();
});
// Edit button functionality
editBtn.addEventListener('click', function () {
    // Show or hide buttons and inputs based on edit mode
    form.querySelectorAll('input, textarea').forEach(function (element) {
        element.disabled = false;
    });
    editBtn.style.display = 'none';
    saveChangesBtn.style.display = 'inline';
    cancelEditBtn.style.display = 'inline';
});
// Save Changes button functionality
saveChangesBtn.addEventListener('click', function () {
    saveData();
    updatePreview({
        fullName: document.getElementById('fullName').value,
        email: document.getElementById('email').value,
        experience: document.getElementById('experience').value,
        education: document.getElementById('education').value,
        skills: document.getElementById('skills').value,
        username: document.getElementById('username').value
    });
    form.querySelectorAll('input, textarea').forEach(function (element) {
        element.disabled = true;
    });
    editBtn.style.display = 'inline';
    saveChangesBtn.style.display = 'none';
    cancelEditBtn.style.display = 'none';
});
// Cancel Edit button functionality
cancelEditBtn.addEventListener('click', function () {
    var savedData = localStorage.getItem('resumeData');
    if (savedData) {
        var data = JSON.parse(savedData);
        document.getElementById('fullName').value = data.fullName;
        document.getElementById('email').value = data.email;
        document.getElementById('experience').value = data.experience;
        document.getElementById('education').value = data.education;
        document.getElementById('skills').value = data.skills;
        document.getElementById('username').value = data.username;
        form.querySelectorAll('input, textarea').forEach(function (element) {
            element.disabled = true;
        });
        editBtn.style.display = 'inline';
        saveChangesBtn.style.display;
    }
});
usernameInput.addEventListener('input', function () {
    var username = usernameInput.value;
    if (username) {
        var uniqueURL = generateUniqueURL(username);
        shareLink.href = uniqueURL;
        shareLink.innerText = "Share your resume: ".concat(uniqueURL);
    }
    else {
        shareLink.href = '';
        shareLink.innerText = 'Enter a username to generate a shareable link';
    }
});
