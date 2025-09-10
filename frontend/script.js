document.getElementById('uploadForm').addEventListener('submit', async function (e) {
  e.preventDefault();
  const form = e.target;
  const formData = new FormData();
  const name = form.name.value.trim();
  const age = form.age.value.trim();
  const file = form.image.files[0];

  if (!file) {
    alert("Please select an image.");
    return;
  }

  formData.append('image', file);

  try {
    const response = await fetch('http://localhost:5000/upload', {
      method: 'POST',
      body: formData
    });

    const data = await response.json();

    if (data.error) {
      alert('❌ Error: ' + data.error);
      return;
    }

    window.location.href = `report.html?name=${encodeURIComponent(name)}&age=${encodeURIComponent(age)}&cavity_count=${data.cavity_count}&output_image=${encodeURIComponent(data.output_image.replace(/\\/g, '/'))}`;
  } catch (err) {
    alert('❌ Server error: ' + err.message);
    console.error(err);
  }
});

document.querySelector('input[name="image"]').addEventListener('change', function(e) {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (event) {
      document.getElementById('previewImage').src = event.target.result;
    };
    reader.readAsDataURL(file);
  }
});
