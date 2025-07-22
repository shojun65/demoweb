// Lưu và hiển thị đánh giá bằng localStorage
const reviewForm = document.getElementById('reviewForm');
const reviewList = document.getElementById('reviewList');

function getReviews() {
    return JSON.parse(localStorage.getItem('reviews') || '[]');
}

function saveReview(review) {
    const reviews = getReviews();
    reviews.unshift(review); // Thêm mới lên đầu
    localStorage.setItem('reviews', JSON.stringify(reviews));
}

function renderReviews() {
    const reviews = getReviews();
    reviewList.innerHTML = '';
    if (reviews.length === 0) {
        reviewList.innerHTML = '<li>Chưa có đánh giá nào.</li>';
        return;
    }
    reviews.forEach(r => {
        const li = document.createElement('li');
        li.innerHTML = `
            <div class="review-header">${r.name} <span class="review-rating">${'★'.repeat(r.rating)}${'☆'.repeat(5 - r.rating)}</span></div>
            <div class="review-comment">${r.comment}</div>
        `;
        reviewList.appendChild(li);
    });
}

reviewForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const rating = parseInt(document.getElementById('rating').value);
    const comment = document.getElementById('comment').value.trim();
    if (!name || !rating || !comment) return;
    saveReview({ name, rating, comment });
    reviewForm.reset();
    renderReviews();
});

document.addEventListener('DOMContentLoaded', renderReviews);
