// Get form elements
var form = document.getElementById('resumeForm');
var previewName = document.getElementById('previewName');
var previewEmail = document.getElementById('previewEmail');
var previewExperience = document.getElementById('previewExperience');
var previewEducation = document.getElementById('previewEducation');
var previewSkills = document.getElementById('previewSkills');
var clearBtn = document.getElementById('clearBtn');
var downloadPDFBtn = document.getElementById('downloadPDF');
// Load from localStorage when page loads
window.addEventListener('load', function () {
    var savedData = localStorage.getItem('resumeData');
    console.log(savedData);
    if (savedData) {
        var data = JSON.parse(savedData);
        document.getElementById('fullName').value = data.fullName;
        document.getElementById('email').value = data.email;
        document.getElementById('experience').value = data.experience;
        document.getElementById('education').value = data.education;
        document.getElementById('skills').value = data.skills;
        updatePreview(data);
    }
});
// Form submit event listener
form.addEventListener('submit', function (e) {
    e.preventDefault();
    // Get the input values
    var fullName = document.getElementById('fullName').value;
    var email = document.getElementById('email').value;
    var experience = document.getElementById('experience').value;
    var education = document.getElementById('education').value;
    var skills = document.getElementById('skills').value;
    // Save the data to localStorage
    var resumeData = { fullName: fullName, email: email, experience: experience, education: education, skills: skills };
    localStorage.setItem('resumeData', JSON.stringify(resumeData));
    // Update the preview
    updatePreview(resumeData);
});
// Update resume preview
function updatePreview(data) {
    previewName.innerText = data.fullName;
    previewEmail.innerText = data.email;
    previewExperience.innerText = data.experience;
    previewEducation.innerText = data.education;
    previewSkills.innerText = data.skills;
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
