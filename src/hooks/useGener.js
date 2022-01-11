const useGener = (selectedGeners) => {

    if (selectedGeners.length < 1) return "";

    const gID = selectedGeners.map((g) => g.id);

    return gID.reduce((acc, curr) => acc + ',' + curr);
}

export default useGener;