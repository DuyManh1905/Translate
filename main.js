const inputText = document.getElementById("inputText");
const translateButton = document.getElementById("translateButton");
const translationResult = document.getElementById("translationResult");
const loadingOverlay = document.getElementById("loadingOverlay");
const loadingSpinner = document.getElementById("loadingSpinner");

translateButton.addEventListener("click", function () {
    const textToTranslate = inputText.value;

    // Hiển thị overlay (với biểu tượng loading) khi bắt đầu dịch
    loadingOverlay.style.display = "flex";

    // Thêm hàm setTimeout để tạo thời gian trễ 3 giây
    setTimeout(function () {
        // Thay đổi URL dịch với API của Google Translate hoặc dịch vụ nào bạn muốn sử dụng
        const translationUrl = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=vi&dt=t&q=${textToTranslate}`;

        fetch(translationUrl)
            .then((response) => response.json())
            .then((data) => {
                const translatedText = data[0][0][0];
                translationResult.innerHTML = `Kết quả dịch: ${translatedText}`;
            })
            .catch((error) => {
                console.error("Lỗi khi dịch: " + error);
                translationResult.innerHTML = "Đã xảy ra lỗi khi dịch.";
            })
            .finally(() => {
                // Ẩn overlay sau khi kết thúc dịch (có lỗi hoặc không)
                loadingOverlay.style.display = "none";
            });
    }, 4000); // 3000 mili giây = 3 giây
});