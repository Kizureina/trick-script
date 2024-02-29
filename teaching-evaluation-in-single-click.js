const elements = document.querySelectorAll('.qBox.objective.required');

elements.forEach((element, index) => {
    const regex = /question_(\d{3})/;
    const match = element.id.match(regex)[1];
    console.log(match + "_" + (index === 12 || index === 13 ? "2" : "0"));
    document.getElementById("option_" + match + "_" + (index === 12 || index === 13 ? "2" : "0")).click();
});

const textareas = document.querySelectorAll('textarea.answer-textarea[maxlength="200"]');

if (textareas.length > 0) {
  const textarea = textareas[0];
  textarea.value = "无意见";
} else {
  console.log("Textarea element not found.");
}
