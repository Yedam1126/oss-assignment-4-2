const API_URL = "https://6916afcca7a34288a27e0948.mockapi.io/items";

// ------------------ 데이터 목록 ------------------
function loadData() {
    fetch(API_URL)
        .then(res => res.json())
        .then(data => {
            const tbody = document.querySelector("#data-table tbody");
            tbody.innerHTML = "";

            data.forEach(item => {
                tbody.innerHTML += `
                    <tr>
                        <td>${item.id}</td>
                        <td>${item.title}</td>
                        <td>${item.price}</td>
                        <td>${item.stock}</td>
                        <td>${item.category}</td>
                        <td>
                            <button class="btn btn-sm btn-warning" onclick="loadEdit(${item.id})">수정</button>
                            <button class="btn btn-sm btn-danger" onclick="deleteItem(${item.id})">삭제</button>
                        </td>
                    </tr>
                `;
            });
        });
}

// ------------------ 데이터 추가 ------------------
document.getElementById("add-submit").addEventListener("click", () => {
    const newItem = {
        title: document.getElementById("add-title").value,
        price: Number(document.getElementById("add-price").value),
        stock: Number(document.getElementById("add-stock").value),
        category: document.getElementById("add-category").value
    };

    fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newItem)
    })
    .then(() => {
        loadData();
        const addModal = bootstrap.Modal.getInstance(document.getElementById('addModal'));
        addModal.hide();
        document.getElementById("addForm").reset();
    });
});

// ------------------ 데이터 수정 ------------------
function loadEdit(id) {
    fetch(`${API_URL}/${id}`)
        .then(res => res.json())
        .then(item => {
            document.getElementById("edit-id").value = item.id;
            document.getElementById("edit-title").value = item.title;
            document.getElementById("edit-price").value = item.price;
            document.getElementById("edit-stock").value = item.stock;
            document.getElementById("edit-category").value = item.category;

            const editModal = new bootstrap.Modal(document.getElementById('editModal'));
            editModal.show();
        });
}

document.getElementById("edit-submit").addEventListener("click", () => {
    const id = document.getElementById("edit-id").value;
    const updatedItem = {
        title: document.getElementById("edit-title").value,
        price: Number(document.getElementById("edit-price").value),
        stock: Number(document.getElementById("edit-stock").value),
        category: document.getElementById("edit-category").value
    };

    fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedItem)
    })
    .then(() => {
        loadData();
        const editModal = bootstrap.Modal.getInstance(document.getElementById('editModal'));
        editModal.hide();
    });
});

// ------------------ 데이터 삭제 ------------------
function deleteItem(id) {
    if(confirm("정말 삭제하시겠습니까?")) {
        fetch(`${API_URL}/${id}`, { method: "DELETE" })
            .then(() => loadData());
    }
}

// ------------------ 초기 데이터 로드 ------------------
loadData();
