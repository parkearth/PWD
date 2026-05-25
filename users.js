// 🔑 環境衛生治理終端 - 使用者授權名冊
// 未來若同仁異動，直接在此處增刪修改即可，不需更動核心程式碼！

export const USER_REGISTRY = {
    // 處室管理員 (可填報與瀏覽)
    "admin": {
        pass: "1234",
        name: "張處長",
        office: "工務局", // 局本部
        role: "ADMIN"
    },
    "tcg_pwa01": {
        pass: "pwd11501",
        name: "王小明",
        office: "新工處",
        role: "ADMIN"
    },
    "tcg_pwa02": {
        pass: "pwd11502",
        name: "李美麗",
        office: "水利處",
        role: "ADMIN"
    },
    "tcg_pwa03": {
        pass: "pwd11503",
        name: "陳國華",
        office: "公園處",
        role: "ADMIN"
    },
    "tcg_pwa04": {
        pass: "pwd11504",
        name: "林志強",
        office: "衛工處",
        role: "ADMIN"
    },
    "tcg_pwa05": {
        pass: "pwd11505",
        name: "黃大安",
        office: "大地處",
        role: "ADMIN"
    },

    // 唯讀檢視者 (僅能瀏覽與匯出資料)
    "viewer": {
        pass: "5678",
        name: "視察長官",
        office: "工務局",
        role: "VIEWER"
    }
};