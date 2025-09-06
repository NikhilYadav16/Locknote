function maskPassword(pass) {
    return '*'.repeat(pass.length);
}

function copyText(txt) {
    navigator.clipboard.writeText(txt).then(
        () => {
            const alertBox = document.getElementById("alert");
            if (alertBox) {
                alertBox.style.display = "inline";
                setTimeout(() => {
                    alertBox.style.display = "none";
                }, 2000);
            }
        },
        () => {
            alert("Clipboard copying failed");
        }
    );
}

const deletePassword = (website, username) => {
    const data = localStorage.getItem("passwords");
    const arr = data ? JSON.parse(data) : [];
    const updatedArr = arr.filter(entry => !(entry.website === website && entry.username === username));
    localStorage.setItem("passwords", JSON.stringify(updatedArr));
    alert(`Successfully deleted ${website} (${username})`);
    showPasswords();
};

const showPasswords = () => {
    const tb = document.querySelector("table");
    const data = localStorage.getItem("passwords");
    if (!data || JSON.parse(data).length === 0) {
        tb.innerHTML = `<tr><td colspan='4' style="text-align:center;">No Data To Show</td></tr>`;
        return;
    }

    const arr = JSON.parse(data);
    let rows = `
        <tr>
            <th>Website</th>
            <th>Username</th>
            <th>Password</th>
            <th>Delete</th>
        </tr>`;

    arr.forEach(entry => {
        rows += `
            <tr>
                <td>${entry.website} 
                    <img 
                        onclick="copyText('${entry.website}')" 
                        src="./copy.svg" 
                        alt="Copy Website" 
                        style="cursor:pointer; width:16px; height:16px; margin-left:5px;" />
                </td>
                <td>${entry.username}
                    <img 
                        onclick="copyText('${entry.username}')" 
                        src="./copy.svg" 
                        alt="Copy Username" 
                        style="cursor:pointer; width:16px; height:16px; margin-left:5px;" />
                </td>
                <td>${maskPassword(entry.password)}
                    <img 
                        onclick="copyText('${entry.password}')" 
                        src="./copy.svg" 
                        alt="Copy Password" 
                        style="cursor:pointer; width:16px; height:16px; margin-left:5px;" />
                </td>
                <td>
                    <button class="btnsm" onclick="deletePassword('${entry.website}', '${entry.username}')">Delete</button>
                </td>
            </tr>`;
    });

    tb.innerHTML = rows;

    
    document.getElementById("website").value = "";
    document.getElementById("username").value = "";
    document.getElementById("password").value = "";
};

document.getElementById("passwordForm").addEventListener("submit", (e) => {
    e.preventDefault();

    const website = document.getElementById("website").value.trim();
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value;

    if (!website || !username || !password) {
        alert("Please fill in all fields.");
        return;
    }

    const stored = localStorage.getItem("passwords");
    const arr = stored ? JSON.parse(stored) : [];

    arr.push({ website, username, password });
    localStorage.setItem("passwords", JSON.stringify(arr));
    alert("Password Saved!");
    showPasswords();
});

console.log("App is working...");
showPasswords();