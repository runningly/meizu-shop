const cookie = {
    get(key) {
        if (document.cookie) {
            // 判断是否有cookie
            let arr = document.cookie.split("; "); // 拆分cookie
            for (let i in arr) {
                let item = arr[i].split("="); // 拆分 key value
                // 通过key找value
                if (item[0] === key) return item[1];
            }
            return ""; // 如果没用找到 返回空字符串
        }
    },
    set(key, value, day) {
        if (typeof day === "number") {
            let d = new Date();
            d.setDate(d.getDate() + day);
            document.cookie = `${key}=${value};expires=${d};path=/`;
        } else {
            document.cookie = `${key}=${value};path=/`;
        }
    },
    remove(key) {
        this.set(key, "", -1);
    },
};

export { cookie };