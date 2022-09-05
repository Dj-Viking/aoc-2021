cat << EOF > $1
(async function(): Promise<void> {
    return new Promise((resolve, reject) => {
        try {
            console.log("hello world");
            resolve();
        } catch(error) {
            reject(error);
        }
    });
})();
EOF