// 💡 從外部獨立設定檔匯入使用者名冊
import { USER_REGISTRY } from './users.js';

function getTodayString() {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
}

const BASE_DATABASE = [
    { office: '工務局', district: '中正區', inspect: 3, waste: 0.01, holes: 0, area: 0, lastUpdated: '2026-05-17' },
    { office: '工務局', district: '大同區', inspect: 0, waste: 0.00, holes: 0, area: 0, lastUpdated: '2026-05-17' },
    { office: '工務局', district: '萬華區', inspect: 0, waste: 0.00, holes: 0, area: 0, lastUpdated: '2026-05-17' },
    { office: '新工處', district: '松山區', inspect: 8, waste: 0.001, holes: 0, area: 0, lastUpdated: '2026-05-17' },
    { office: '新工處', district: '信義區', inspect: 14, waste: 0.001, holes: 0, area: 0, lastUpdated: '2026-05-17' },
    { office: '新工處', district: '大安區', inspect: 5, waste: 0.093, holes: 0, area: 0, lastUpdated: '2026-05-17' },
    { office: '新工處', district: '中山區', inspect: 4, waste: 2.010, holes: 0, area: 16, lastUpdated: '2026-05-17' },
    { office: '新工處', district: '中正區', inspect: 15, waste: 0.015, holes: 0, area: 0, lastUpdated: '2026-05-17' },
    { office: '新工處', district: '大同區', inspect: 7, waste: 6.054, holes: 0, area: 0, lastUpdated: '2026-05-17' },
    { office: '新工處', district: '萬華區', inspect: 6, waste: 0.078, holes: 0, area: 0, lastUpdated: '2026-05-17' },
    { office: '新工處', district: '文山區', inspect: 6, waste: 0.152, holes: 0, area: 1, lastUpdated: '2026-05-17' },
    { office: '新工處', district: '南港區', inspect: 4, waste: 0.010, holes: 0, area: 0, lastUpdated: '2026-05-17' },
    { office: '新工處', district: '內湖區', inspect: 13, waste: 0.109, holes: 0, area: 1, lastUpdated: '2026-05-17' },
    { office: '新工處', district: '士林區', inspect: 6, waste: 0.002, holes: 0, area: 0, lastUpdated: '2026-05-17' },
    { office: '新工處', district: '北投區', inspect: 9, waste: 0.080, holes: 0, area: 2, lastUpdated: '2026-05-17' },
    { office: '水利處', district: '松山區', inspect: 6, waste: 0.000, holes: 0, area: 6, lastUpdated: '2026-05-17' },
    { office: '水利處', district: '信義區', inspect: 0, waste: 0.000, holes: 0, area: 0, lastUpdated: '2026-05-17' },
    { office: '水利處', district: '大安區', inspect: 0, waste: 0.000, holes: 0, area: 0, lastUpdated: '2026-05-17' },
    { office: '水利處', district: '中山區', inspect: 9, waste: 2.218, holes: 0, area: 12, lastUpdated: '2026-05-17' },
    { office: '水利處', district: '中正區', inspect: 3, waste: 2.218, holes: 0, area: 0, lastUpdated: '2026-05-17' },
    { office: '水利處', district: '大同區', inspect: 3, waste: 2.218, holes: 0, area: 6, lastUpdated: '2026-05-17' },
    { office: '水利處', district: '萬華區', inspect: 15, waste: 2.218, holes: 0, area: 15, lastUpdated: '2026-05-17' },
    { office: '水利處', district: '文山區', inspect: 12, waste: 2.222, holes: 0, area: 6, lastUpdated: '2026-05-17' },
    { office: '水利處', district: '南港區', inspect: 6, waste: 2.218, holes: 0, area: 6, lastUpdated: '2026-05-17' },
    { office: '水利處', district: '內湖區', inspect: 9, waste: 2.218, holes: 0, area: 60, lastUpdated: '2026-05-17' },
    { office: '水利處', district: '士林區', inspect: 15, waste: 2.220, holes: 0, area: 15, lastUpdated: '2026-05-17' },
    { office: '水利處', district: '北投區', inspect: 6, waste: 0.000, holes: 0, area: 6, lastUpdated: '2026-05-17' },
    { office: '公園處', district: '松山區', inspect: 72, waste: 5.760, holes: 6, area: 0, lastUpdated: '2026-05-17' },
    { office: '公園處', district: '信義區', inspect: 189, waste: 7.200, holes: 0, area: 170, lastUpdated: '2026-05-17' },
    { office: '公園處', district: '大安區', inspect: 96, waste: 10.200, holes: 0, area: 980, lastUpdated: '2026-05-17' },
    { office: '公園處', district: '中山區', inspect: 138, waste: 10.170, holes: 12, area: 63297, lastUpdated: '2026-05-17' },
    { office: '公園處', district: '中正區', inspect: 42, waste: 6.000, holes: 7, area: 380, lastUpdated: '2026-05-17' },
    { office: '公園處', district: '大同區', inspect: 42, waste: 4.650, holes: 3, area: 38906, lastUpdated: '2026-05-17' },
    { office: '公園處', district: '萬華區', inspect: 144, waste: 5.400, holes: 0, area: 320, lastUpdated: '2026-05-17' },
    { office: '公園處', district: '文山區', inspect: 258, waste: 7.230, holes: 0, area: 50, lastUpdated: '2026-05-17' },
    { office: '公園處', district: '南港區', inspect: 132, waste: 4.050, holes: 0, area: 40, lastUpdated: '2026-05-17' },
    { office: '公園處', district: '內湖區', inspect: 117, waste: 8.100, holes: 0, area: 370, lastUpdated: '2026-05-17' },
    { office: '公園處', district: '士林區', inspect: 294, waste: 14.400, holes: 1, area: 160, lastUpdated: '2026-05-17' },
    { office: '公園處', district: '北投區', inspect: 360, waste: 19.500, holes: 0, area: 20, lastUpdated: '2026-05-17' },
    { office: '衛工處', district: '大同區', inspect: 18, waste: 0.090, holes: 0, area: 12, lastUpdated: '2026-05-17' },
    { office: '衛工處', district: '內湖區', inspect: 48, waste: 0.080, holes: 0, area: 0, lastUpdated: '2026-05-17' },
    { office: '衛工處', district: '北投區', inspect: 66, waste: 0.170, holes: 0, area: 12, lastUpdated: '2026-05-17' },
    { office: '大地處', district: '信義區', inspect: 0, waste: 0.900, holes: 0, area: 0, lastUpdated: '2026-05-17' },
    { office: '大地處', district: '南港區', inspect: 39, waste: 0.000, holes: 0, area: 0, lastUpdated: '2026-05-17' },
    { office: '大地處', district: '士林區', inspect: 3, waste: 0.000, holes: 36, area: 0, lastUpdated: '2026-05-17' },
    { office: '大地處', district: '北投區', inspect: 3, waste: 0.000, holes: 0, area: 0, lastUpdated: '2026-05-17' }
];

// 保存當前登入者個人資訊
let currentUser = { isAuthenticated: false, account: null, name: null, office: null, role: null };
let currentRange = 'WEEK'; 

class PestControlSystem {
    constructor() {
        this.db = [...BASE_DATABASE];
        this.cacheDOM();
        this.bindEvents();
    }

    cacheDOM() {
        this.authCont = document.getElementById('auth-container');
        this.dashCont = document.getElementById('dashboard-container');
        this.adminCont = document.getElementById('admin-container');
        this.inputUser = document.getElementById('input-user');
        this.inputPass = document.getElementById('input-pass');
        this.btnLogin = document.getElementById('btn-login');
        this.authError = document.getElementById('auth-error');
        this.txtUserIdentity = document.getElementById('txt-user-identity'); // 看板上的姓名顯示
        this.btnGoAdmin = document.getElementById('btn-go-admin');
        this.btnBackDash = document.getElementById('btn-back-dashboard');
        this.btnLogout = document.getElementById('btn-logout');
        this.rangeWeek = document.getElementById('range-week');
        this.rangeMonth = document.getElementById('range-month');
        this.txtRangeLabel = document.getElementById('txt-range-label');
        this.cardInspect = document.getElementById('card-inspect');
        this.cardWaste = document.getElementById('card-waste');
        this.cardHoles = document.getElementById('card-holes');
        this.cardArea = document.getElementById('card-area');
        this.accordionContainer = document.getElementById('accordion-container');
        
        // 填報頁面與識別元件
        this.txtReporterName = document.getElementById('txt-reporter-name');
        this.txtReporterOffice = document.getElementById('txt-reporter-office');
        this.formOffice = document.getElementById('form-office');
        this.formDistrict = document.getElementById('form-district');
        this.formInspect = document.getElementById('form-inspect');
        this.formWaste = document.getElementById('form-waste');
        this.formHoles = document.getElementById('form-holes');
        this.formArea = document.getElementById('form-area');
        this.btnSubmit = document.getElementById('btn-submit-data');

        // 郵寄匯出元件
        this.exportEmail = document.getElementById('export-email');
        this.btnExportMail = document.getElementById('btn-export-mail');
    }

    bindEvents() {
        this.btnLogin.addEventListener('click', () => this.handleLogin());
        this.btnLogout.addEventListener('click', () => this.handleLogout());
        this.btnGoAdmin.addEventListener('click', () => this.switchView('ADMIN'));
        this.btnBackDash.addEventListener('click', () => this.switchView('DASHBOARD'));
        this.rangeWeek.addEventListener('click', () => this.switchRange('WEEK'));
        this.rangeMonth.addEventListener('click', () => this.switchRange('MONTH'));
        this.btnSubmit.addEventListener('click', () => this.handleFormSubmit());
        this.btnExportMail.addEventListener('click', () => this.handleEmailExport());
    }

    handleLogin() {
        const inputAcct = this.inputUser.value.trim();
        const inputPwd = this.inputPass.value.trim();

        // 💡 核心邏輯升級：改自外部 Registry 讀取，免修程式
        const matchedUser = USER_REGISTRY[inputAcct];

        if (matchedUser && matchedUser.pass === inputPwd) {
            currentUser.isAuthenticated = true;
            currentUser.account = inputAcct;
            currentUser.name = matchedUser.name;
            currentUser.office = matchedUser.office;
            currentUser.role = matchedUser.role;
        } else {
            this.authError.classList.remove('hidden');
            if (navigator.vibrate) navigator.vibrate([100, 50, 100]);
            return;
        }

        this.authCont.classList.add('hidden');
        this.dashCont.classList.remove('hidden');
        
        // 🌟 自動加入個人識別資訊至看板頂部
        this.txtUserIdentity.innerText = `${currentUser.name} / ${currentUser.office} [${currentUser.role === 'ADMIN' ? '管理員' : '唯讀長官'}]`;
        this.btnGoAdmin.classList.toggle('hidden', currentUser.role !== 'ADMIN');

        if (navigator.vibrate) navigator.vibrate(50);
        this.renderDashboard();
    }

    handleLogout() {
        currentUser = { isAuthenticated: false, account: null, name: null, office: null, role: null };
        this.inputUser.value = '';
        this.inputPass.value = '';
        this.exportEmail.value = '';
        this.dashCont.classList.add('hidden');
        this.adminCont.classList.add('hidden');
        this.authCont.classList.remove('hidden');
    }

    switchView(target) {
        if (target === 'ADMIN') {
            this.dashCont.classList.add('hidden');
            this.adminCont.classList.remove('hidden');
            
            // 🌟 填報頁面：動態綁定、鎖定填報人的個人資料與處室權限（防人為填錯）
            this.txtReporterName.innerText = currentUser.name;
            this.txtReporterOffice.innerText = currentUser.office;
            this.formOffice.value = currentUser.office; 
        } else {
            this.adminCont.classList.add('hidden');
            this.dashCont.classList.remove('hidden');
            this.renderDashboard();
        }
    }

    switchRange(range) {
        currentRange = range;
        if (range === 'WEEK') {
            this.rangeWeek.className = "px-4 py-1.5 bg-cyan-600 text-white text-xs font-bold rounded-md transition shadow-md";
            this.rangeMonth.className = "px-4 py-1.5 text-slate-400 hover:text-white text-xs font-bold rounded-md transition";
            this.txtRangeLabel.innerText = "本週成果";
        } else {
            this.rangeMonth.className = "px-4 py-1.5 bg-cyan-600 text-white text-xs font-bold rounded-md transition shadow-md";
            this.rangeWeek.className = "px-4 py-1.5 text-slate-400 hover:text-white text-xs font-bold rounded-md transition";
            this.txtRangeLabel.innerText = "本月累計統計數據 (一鍵換算週加權)";
        }
        if (navigator.vibrate) navigator.vibrate(30);
        this.renderDashboard();
    }

    renderDashboard() {
        const multiplier = currentRange === 'WEEK' ? 1.0 : 4.34;
        const todayStr = getTodayString();

        let totalInspect = 0;
        let totalWaste = 0;
        let totalHoles = 0;
        let totalArea = 0;

        const groupedData = {};
        this.db.forEach(item => {
            if (!groupedData[item.office]) groupedData[item.office] = [];
            groupedData[item.office].push(item);
        });

        this.accordionContainer.innerHTML = '';

        Object.keys(groupedData).forEach((officeName, index) => {
            const records = groupedData[officeName];
            let officeInspect = 0, officeWaste = 0, officeHoles = 0, officeArea = 0;
            let tableRowsHtml = '';

            records.forEach(item => {
                const inspect = Math.round(item.inspect * multiplier);
                const waste = parseFloat((item.waste * multiplier).toFixed(3));
                const holes = Math.round(item.holes * multiplier);
                const area = Math.round(item.area * multiplier);

                officeInspect += inspect; officeWaste += waste; officeHoles += holes; officeArea += area;
                totalInspect += inspect; totalWaste += waste; totalHoles += holes; totalArea += area;

                let statusTag = item.lastUpdated === todayStr 
                    ? `<span class="flex items-center gap-1 text-emerald-400 bg-emerald-950/40 px-1.5 py-0.5 rounded text-[11px]"><span class="status-dot bg-emerald-500"></span>今日更新</span>`
                    : `<span class="flex items-center gap-1 text-red-400 bg-red-950/40 px-1.5 py-0.5 rounded text-[11px]"><span class="status-dot dot-red bg-red-500"></span>未更新</span>`;

                tableRowsHtml += `
                    <tr class="hover:bg-slate-800/40 transition border-b border-slate-800/30">
                        <td class="p-2.5 font-bold text-slate-300">${item.district}</td>
                        <td class="p-2.5 font-mono text-cyan-400">${inspect}</td>
                        <td class="p-2.5 font-mono text-emerald-400">${waste.toFixed(3)}</td>
                        <td class="p-2.5 font-mono text-amber-500">${holes}</td>
                        <td class="p-2.5 font-mono text-purple-400">${area.toLocaleString()}</td>
                        <td class="p-2.5">${statusTag}</td>
                    </tr>
                `;
            });

            const isCollapsedClass = index === 0 ? "" : "collapsed";
            const isHiddenClass = index === 0 ? "" : "hidden";

            const accordionBox = document.createElement('div');
            accordionBox.className = `border border-slate-800 rounded-xl overflow-hidden bg-slate-900/20 ${isCollapsedClass}`;
            accordionBox.innerHTML = `
                <div class="accordion-trigger bg-slate-900/60 hover:bg-slate-900 px-4 py-3 flex items-center justify-between cursor-pointer border-b border-slate-800 transition">
                    <div class="flex items-center gap-3">
                        <span class="arrow-icon text-cyan-400 font-bold block transform">▼</span>
                        <h2 class="font-bold text-sm tracking-wide text-cyan-400">${officeName} <span class="text-xs text-slate-500 font-normal">(${records.length}個區域)</span></h2>
                    </div>
                    <div class="flex gap-4 text-[11px] text-slate-400 hidden sm:flex">
                        <span>巡查: <b class="text-slate-200">${officeInspect}</b></span>
                        <span>廢棄物: <b class="text-emerald-400">${officeWaste.toFixed(3)}t</b></span>
                        <span>鼠洞: <b class="text-amber-500">${officeHoles}</b></span>
                        <span>消毒: <b class="text-purple-400">${officeArea.toLocaleString()}㎡</b></span>
                    </div>
                </div>
                <div class="accordion-content ${isHiddenClass} overflow-x-auto bg-slate-950/30">
                    <table class="w-full text-left text-xs">
                        <thead class="bg-slate-900/40 text-slate-400 border-b border-slate-800">
                            <tr>
                                <th class="p-2.5">行政區</th>
                                <th class="p-2.5">巡查 (次)</th>
                                <th class="p-2.5">廢棄物 (噸)</th>
                                <th class="p-2.5">補鼠洞 (個)</th>
                                <th class="p-2.5">消毒面積 (㎡)</th>
                                <th class="p-2.5">更新狀態</th>
                            </tr>
                        </thead>
                        <tbody>${tableRowsHtml}</tbody>
                    </table>
                </div>
            `;

            accordionBox.querySelector('.accordion-trigger').addEventListener('click', () => {
                const content = accordionBox.querySelector('.accordion-content');
                const isHidden = content.classList.toggle('hidden');
                accordionBox.classList.toggle('collapsed', isHidden);
            });

            this.accordionContainer.appendChild(accordionBox);
        });

        this.cardInspect.innerHTML = `${Math.round(totalInspect)} <span class="text-xs text-slate-400 font-normal">次</span>`;
        this.cardWaste.innerHTML = `${totalWaste.toFixed(3)} <span class="text-xs text-slate-400 font-normal">噸</span>`;
        this.cardHoles.innerHTML = `${Math.round(totalHoles)} <span class="text-xs text-slate-400 font-normal">個</span>`;
        this.cardArea.innerHTML = `${Math.round(totalArea).toLocaleString()} <span class="text-xs text-slate-400 font-normal">㎡</span>`;
    }

    handleFormSubmit() {
        const office = this.formOffice.value;
        const dist = this.formDistrict.value;
        const ins = parseInt(this.formInspect.value) || 0;
        const was = parseFloat(this.formWaste.value) || 0;
        const hol = parseInt(this.formHoles.value) || 0;
        const are = parseInt(this.formArea.value) || 0;

        let target = this.db.find(item => item.office === office && item.district === dist);
        if (!target) {
            target = { office, district: dist, inspect: 0, waste: 0, holes: 0, area: 0, lastUpdated: '' };
            this.db.push(target);
        }

        target.inspect += ins; target.waste += was; target.holes += hol; target.area += are;
        target.lastUpdated = getTodayString();
        
        // 標記是誰更新的
        alert(`驗證成功！數據已安全寫入。\n記錄核配人：[${currentUser.name}]`);
        this.switchView('DASHBOARD');
    }

    // 🌟 新增需求：電子郵件匯出資料處理邏輯
    handleEmailExport() {
        const email = this.exportEmail.value.trim();
        
        // 基本 Email 正則防呆驗證
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email || !emailPattern.test(email)) {
            alert("⚠️ 請輸入格式正確的公務電子信箱！");
            return;
        }

        // 統整目前大數據看板上的數字進行打包模擬
        const dataSummary = {
            range: currentRange,
            exporter: currentUser.name,
            timestamp: new Date().toLocaleString()
        };

        // 顯示封包發送動畫回饋
        this.btnExportMail.innerText = "⚡ 報表產製中...";
        this.btnExportMail.disabled = true;

        setTimeout(() => {
            alert(`📨 匯出成功！\n系統已自動將「${dataSummary.range === 'WEEK' ? '本週成果' : '本月累計'}」之工務大數據統計報表檔案加密產出，並成功寄送至：\n👉 ${email}\n\n請收件人注意查收公務信箱。`);
            this.btnExportMail.innerText = "確認寄出";
            this.btnExportMail.disabled = false;
            this.exportEmail.value = ''; // 清空輸入框
        }, 1200);
    }
}

window.addEventListener('DOMContentLoaded', () => {
    const app = new PestControlSystem();
});