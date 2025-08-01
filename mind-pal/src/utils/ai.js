export async function answerQuestion(context, question) {
  if (!context || !question) {
    return "Question or context missing.";
  }

  try {
    const response = await fetch(
      "https://api-inference.huggingface.co/models/deepset/roberta-base-squad2",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_HUGGINGFACE_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          inputs: {
            question: question,
            context: context.slice(0, 1000), // ⛔ Avoid context overflow
          },
        }),
      }
    );

    if (!response.ok) {
      const err = await response.json();
      console.error("HF API Error:", err);
      return "Hugging Face API error: " + (err.error || "Unexpected error.");
    }

    const data = await response.json();
    return data.answer || "No answer found.";
  } catch (error) {
    console.error("Request failed:", error);
    return "Failed to get response from AI.";
  }
}
