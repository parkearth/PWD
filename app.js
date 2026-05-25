import { USER_REGISTRY } from './users.js';

function getTodayString() {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
}

// 🗄️ v2.0 歷史流水帳結構 (完整保留 46 筆基礎數據)
const BASE_LOGS = [
    { date: '2026-05-17', reporter: '初期建檔', office: '工務局', district: '中正區', inspect: 3, waste: 0.01, holes: 0, area: 0 },
    { date: '2026-05-17', reporter: '初期建檔', office: '工務局', district: '大同區', inspect: 0, waste: 0.00, holes: 0, area: 0 },
    { date: '2026-05-17', reporter: '初期建檔', office: '工務局', district: '萬華區', inspect: 0, waste: 0.00, holes: 0, area: 0 },
    { date: '2026-05-17', reporter: '初期建檔', office: '新工處', district: '松山區', inspect: 8, waste: 0.001, holes: 0, area: 0 },
    { date: '2026-05-17', reporter: '初期建檔', office: '新工處', district: '信義區', inspect: 14, waste: 0.001, holes: 0, area: 0 },
    { date: '2026-05-17', reporter: '初期建檔', office: '新工處', district: '大安區', inspect: 5, waste: 0.093, holes: 0, area: 0 },
    { date: '2026-05-17', reporter: '初期建檔', office: '新工處', district: '中山區', inspect: 4, waste: 2.010, holes: 0, area: 16 },
    { date: '2026-05-17', reporter: '初期建檔', office: '新工處', district: '中正區', inspect: 15, waste: 0.015, holes: 0, area: 0 },
    { date: '2026-05-17', reporter: '初期建檔', office: '新工處', district: '大同區', inspect: 7, waste: 6.054, holes: 0, area: 0 },
    { date: '2026-05-17', reporter: '初期建檔', office: '新工處', district: '萬華區', inspect: 6, waste: 0.078, holes: 0, area: 0 },
    { date: '2026-05-17', reporter: '初期建檔', office: '新工處', district: '文山區', inspect: 6, waste: 0.152, holes: 0, area: 1 },
    { date: '2026-05-17', reporter: '初期建檔', office: '新工處', district: '南港區', inspect: 4, waste: 0.010, holes: 0, area: 0 },
    { date: '2026-05-17', reporter: '初期建檔', office: '新工處', district: '內湖區', inspect: 13, waste: 0.109, holes: 0, area: 1 },
    { date: '2026-05-17', reporter: '初期建檔', office: '新工處', district: '士林區', inspect: 6, waste: 0.002, holes: 0, area: 0 },
    { date: '2026-05-17', reporter: '初期建檔', office: '新工處', district: '北投區', inspect: 9, waste: 0.080, holes: 0, area: 2 },
    { date: '2026-05-17', reporter: '初期建檔', office: '水利處', district: '松山區', inspect: 6, waste: 0.000, holes: 0, area: 6 },
    { date: '2026-05-17', reporter: '初期建檔', office: '水利處', district: '信義區', inspect: 0, waste: 0.000, holes: 0, area: 0 },
    { date: '2026-05-17', reporter: '初期建檔', office: '水利處', district: '大安區', inspect: 0, waste: 0.000, holes: 0, area: 0 },
    { date: '2026-05-17', reporter: '初期建檔', office: '水利處', district: '中山區', inspect: 9, waste: 2.218, holes: 0, area: 12 },
    { date: '2026-05-17', reporter: '初期建檔', office: '水利處', district: '中正區', inspect: 3, waste: 2.218, holes: 0, area: 0 },
    { date: '2026-05-17', reporter: '初期建檔', office: '水利處', district: '大同區', inspect: 3, waste: 2.218, holes: 0, area: 6 },
    { date: '2026-05-17', reporter: '初期建檔', office: '水利處', district: '萬華區', inspect: 15, waste: 2.218, holes: 0, area: 15 },
    { date: '2026-05-17', reporter: '初期建檔', office: '水利處', district: '文山區', inspect: 12, waste: 2.222, holes: 0, area: 6 },
    { date: '2026-05-17', reporter: '初期建檔', office: '水利處', district: '南港區', inspect: 6, waste: 2.218, holes: 0, area: 6 },
    { date: '2026-05-17', reporter: '初期建檔', office: '水利處', district: '內湖區', inspect: 9, waste: 2.218, holes: 0, area: 60 },
    { date: '2026-05-17', reporter: '初期建檔', office: '水利處', district: '士林區', inspect: 15, waste: 2.220, holes: 0, area: 15 },
    { date: '2026-05-17', reporter: '初期建檔', office: '水利處', district: '北投區', inspect: 6, waste: 0.000, holes: 0, area: 6 },
    { date: '2026-05-17', reporter: '初期建檔', office: '公園處', district: '松山區', inspect: 72, waste: 5.760, holes: 6, area: 0 },
    { date: '2026-05-17', reporter: '初期建檔', office: '公園處', district: '信義區', inspect: 189, waste: 7.200, holes: 0, area: 170 },
    { date: '2026-05-17', reporter: '初期建檔', office: '公園處', district: '大安區', inspect: 96, waste: 10.200, holes: 0, area: 980 },
    { date: '2026-05-17', reporter: '初期建檔', office: '公園處', district: '中山區', inspect: 138, waste: 10.170, holes: 12, area: 63297 },
    { date: '2026-05-17', reporter: '初期建檔', office: '公園處', district: '中正區', inspect: 42, waste: 6.000, holes: 7, area: 380 },
    { date: '2026-05-17', reporter: '初期建檔', office: '公園處', district: '大同區', inspect: 42, waste: 4.650, holes: 3, area: 38906 },
    { date: '2026-05-17', reporter: '初期建檔', office: '公園處', district: '萬華區', inspect: 144, waste: 5.400, holes: 0, area: 320 },
    { date: '2026-05-17', reporter: '初期建檔', office: '公園處', district: '文山區', inspect: 258, waste: 7.230, holes: 0, area: 50 },
    { date: '2026-05-17', reporter: '初期建檔', office: '公園處', district: '南港區', inspect: 132, waste: 4.050, holes: 0, area: 40 },
    { date: '2026-05-17', reporter: '初期建檔', office: '公園處', district: '內湖區', inspect: 117, waste: 8.100, holes: 0, area: 370 },
    { date: '2026-05-17', reporter: '初期建檔', office: '公園處', district: '士林區', inspect: 294, waste: 14.400, holes: 1, area: 160 },
    { date: '2026-05-17', reporter: '初期建檔', office: '公園處', district: '北投區', inspect: 360, waste: 19.500, holes: 0, area: 20 },
    { date: '2026-05-17', reporter: '初期建檔', office: '衛工處', district: '大同區', inspect: 18, waste: 0.090, holes: 0, area: 12 },
    { date: '2026-05-17', reporter: '初期建檔', office: '衛工處', district: '內湖區', inspect: 48, waste: 0.080, holes: 0, area: 0 },
    { date: '2026-05-17', reporter: '初期建檔', office: '衛工處', district: '北投區', inspect: 66, waste: 0.170, holes: 0, area: 12 },
    { date: '2026-05-17', reporter: '初期建檔', office: '大地處', district: '信義區', inspect: 0, waste: 0.900, holes: 0, area: 0 },
    { date: '2026-05-17', reporter: '初期建檔', office: '大地處', district: '南港區', inspect: 39, waste: 0.000, holes: 0, area: 0 },
    { date: '2026-05-17', reporter: '初期建檔', office: '大地處', district: '士林區', inspect: 3, waste: 0.000, holes: 36, area: 0 },
    { date: '2026-05-17', reporter: '初期建檔', office: '大地處', district: '北投區', inspect: 3, waste: 0.000, holes: 0, area: 0 }
];

let currentUser = { isAuthenticated: false, account: null, name: null, office: null, role: null };
let currentRange = 'WEEK'; 

class PestControlSystem {
    constructor() {
        this.logs = [...BASE_LOGS]; // 使用 Log 陣列
        this.cacheDOM();
        this.bindEvents();
        // 預設日期為今天
        this.historyDatePicker.value = getTodayString();
    }

    cacheDOM() {
        // 架構容器
        this.authCont = document.getElementById('auth-container');
        this.appWrapper = document.getElementById('app-wrapper');
        this.navTabs = document.querySelectorAll('.nav-tab');
        this.tabAdmin = document.getElementById('tab-admin');
        
        // 登入相關
        this.inputUser = document.getElementById('input-user');
        this.inputPass = document.getElementById('input-pass');
        this.btnLogin = document.getElementById('btn-login');
        this.authError = document.getElementById('auth-error');
        this.txtUserIdentity = document.getElementById('txt-user-identity');
        this.btnLogout = document.getElementById('btn-logout');
        
        // 總覽頁面 (Dashboard)
        this.rangeWeek = document.getElementById('range-week');
        this.rangeMonth = document.getElementById('range-month');
        this.txtRangeLabel = document.getElementById('txt-range-label');
        this.cardInspect = document.getElementById('card-inspect');
        this.cardWaste = document.getElementById('card-waste');
        this.cardHoles = document.getElementById('card-holes');
        this.cardArea = document.getElementById('card-area');
        this.accordionContainer = document.getElementById('accordion-container');
        this.btnExportCsv = document.getElementById('btn-export-csv');

        // 月曆查詢頁面 (History)
        this.historyDatePicker = document.getElementById('history-date-picker');
        this.historyTableBody = document.getElementById('history-table-body');
        
        // 填報頁面 (Admin)
        this.txtReporterName = document.getElementById('txt-reporter-name');
        this.txtReporterOffice = document.getElementById('txt-reporter-office');
        this.formOffice = document.getElementById('form-office');
        this.formDistrict = document.getElementById('form-district');
        this.formInspect = document.getElementById('form-inspect');
        this.formWaste = document.getElementById('form-waste');
        this.formHoles = document.getElementById('form-holes');
        this.formArea = document.getElementById('form-area');
        this.btnSubmit = document.getElementById('btn-submit-data');
    }

    bindEvents() {
        this.btnLogin.addEventListener('click', () => this.handleLogin());
        this.btnLogout.addEventListener('click', () => this.handleLogout());
        
        // 底部導覽列切換
        this.navTabs.forEach(tab => {
            tab.addEventListener('click', (e) => {
                const target = e.currentTarget.getAttribute('data-target');
                this.switchTab(target);
            });
        });

        this.rangeWeek.addEventListener('click', () => this.switchRange('WEEK'));
        this.rangeMonth.addEventListener('click', () => this.switchRange('MONTH'));
        this.btnSubmit.addEventListener('click', () => this.handleFormSubmit());
        this.btnExportCsv.addEventListener('click', () => this.handleCsvExport());
        
        // 日期變更時即時重繪
        this.historyDatePicker.addEventListener('change', () => this.renderHistory());
    }

    handleLogin() {
        const inputAcct = this.inputUser.value.trim();
        const inputPwd = this.inputPass.value.trim();
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
        this.appWrapper.classList.remove('hidden');
        this.appWrapper.classList.add('flex');
        
        this.txtUserIdentity.innerText = `${currentUser.name} / ${currentUser.office} [${currentUser.role === 'ADMIN' ? '管理員' : '唯讀'}]`;
        
        // 依權限開放填報 Tab
        if (currentUser.role === 'ADMIN') {
            this.tabAdmin.classList.remove('hidden');
            this.txtReporterName.innerText = currentUser.name;
            this.txtReporterOffice.innerText = currentUser.office;
            this.formOffice.value = currentUser.office;
        } else {
            this.tabAdmin.classList.add('hidden');
        }

        if (navigator.vibrate) navigator.vibrate(50);
        this.switchTab('dashboard'); // 登入預設進入看板
    }

    handleLogout() {
        currentUser = { isAuthenticated: false, account: null, name: null, office: null, role: null };
        this.inputUser.value = '';
        this.inputPass.value = '';
        this.appWrapper.classList.add('hidden');
        this.appWrapper.classList.remove('flex');
        this.authCont.classList.remove('hidden');
    }

    // 🌟 v2.0 Tab Bar 切換邏輯
    switchTab(tabId) {
        // 隱藏所有頁面
        document.querySelectorAll('.page-section').forEach(page => page.classList.add('hidden'));
        // 移除所有 Tab 活躍狀態
        this.navTabs.forEach(tab => tab.classList.remove('tab-active'));
        
        // 顯示目標
        document.getElementById(`page-${tabId}`).classList.remove('hidden');
        document.querySelector(`.nav-tab[data-target="${tabId}"]`).classList.add('tab-active');

        if (tabId === 'dashboard') this.renderDashboard();
        if (tabId === 'history') this.renderHistory();
        if (navigator.vibrate) navigator.vibrate(20);
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
            this.txtRangeLabel.innerText = "本月累計統計數據 (換算)";
        }
        this.renderDashboard();
    }

    // 🌟 Dashboard: 針對流水帳進行動態 Group By 累加計算，並抓取最後更新日期
    renderDashboard() {
        const multiplier = currentRange === 'WEEK' ? 1.0 : 4.34;
        let totalInspect = 0, totalWaste = 0, totalHoles = 0, totalArea = 0;
        const groupedData = {};

        this.logs.forEach(log => {
            if (!groupedData[log.office]) groupedData[log.office] = {};
            if (!groupedData[log.office][log.district]) {
                groupedData[log.office][log.district] = { inspect: 0, waste: 0, holes: 0, area: 0, lastUpdated: '1970-01-01' };
            }
            
            let target = groupedData[log.office][log.district];
            target.inspect += log.inspect;
            target.waste += log.waste;
            target.holes += log.holes;
            target.area += log.area;
            
            // 抓取最後一次回報的日期
            if (new Date(log.date) > new Date(target.lastUpdated)) {
                target.lastUpdated = log.date;
            }
        });

        this.accordionContainer.innerHTML = '';

        Object.keys(groupedData).forEach((officeName, index) => {
            const districtMap = groupedData[officeName];
            let officeInspect = 0, officeWaste = 0, officeHoles = 0, officeArea = 0;
            let tableRowsHtml = '';

            Object.keys(districtMap).forEach(distName => {
                const data = districtMap[distName];
                const inspect = Math.round(data.inspect * multiplier);
                const waste = parseFloat((data.waste * multiplier).toFixed(3));
                const holes = Math.round(data.holes * multiplier);
                const area = Math.round(data.area * multiplier);

                officeInspect += inspect; officeWaste += waste; officeHoles += holes; officeArea += area;
                totalInspect += inspect; totalWaste += waste; totalHoles += holes; totalArea += area;

                tableRowsHtml += `
                    <tr class="hover:bg-slate-800/40 transition border-b border-slate-800/30">
                        <td class="p-2.5 font-bold text-slate-300">${distName}</td>
                        <td class="p-2.5 font-mono text-cyan-400">${inspect}</td>
                        <td class="p-2.5 font-mono text-emerald-400">${waste.toFixed(3)}</td>
                        <td class="p-2.5 font-mono text-amber-500">${holes}</td>
                        <td class="p-2.5 font-mono text-purple-400">${area.toLocaleString()}</td>
                        <td class="p-2.5 text-xs text-slate-400 font-mono tracking-tighter">${data.lastUpdated}</td>
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
                        <h2 class="font-bold text-sm tracking-wide text-cyan-400">${officeName} <span class="text-xs text-slate-500 font-normal">(${Object.keys(districtMap).length}區)</span></h2>
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
                                <th class="p-2.5">總巡查(次)</th>
                                <th class="p-2.5">總廢棄物(噸)</th>
                                <th class="p-2.5">總鼠洞(個)</th>
                                <th class="p-2.5">總消毒(㎡)</th>
                                <th class="p-2.5">最後更新日期</th>
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

    // 🌟 History: 月曆過濾渲染功能
    renderHistory() {
        const targetDate = this.historyDatePicker.value;
        const filteredLogs = this.logs.filter(log => log.date === targetDate);
        
        this.historyTableBody.innerHTML = '';
        
        if (filteredLogs.length === 0) {
            this.historyTableBody.innerHTML = `<tr><td colspan="7" class="p-6 text-center text-slate-500 font-bold">此日期暫無填報紀錄</td></tr>`;
            return;
        }

        filteredLogs.forEach(log => {
            this.historyTableBody.innerHTML += `
                <tr class="hover:bg-slate-800/40 transition">
                    <td class="p-2.5 font-bold text-cyan-400">${log.office}</td>
                    <td class="p-2.5 text-slate-300">${log.district}</td>
                    <td class="p-2.5 text-purple-400">${log.reporter}</td>
                    <td class="p-2.5 text-right font-mono">${log.inspect}</td>
                    <td class="p-2.5 text-right font-mono">${log.waste.toFixed(3)}</td>
                    <td class="p-2.5 text-right font-mono">${log.holes}</td>
                    <td class="p-2.5 text-right font-mono">${log.area.toLocaleString()}</td>
                </tr>
            `;
        });
    }

    // 🌟 Admin: 以 append 取代覆蓋
    handleFormSubmit() {
        const office = this.formOffice.value;
        const dist = this.formDistrict.value;
        const ins = parseInt(this.formInspect.value) || 0;
        const was = parseFloat(this.formWaste.value) || 0;
        const hol = parseInt(this.formHoles.value) || 0;
        const are = parseInt(this.formArea.value) || 0;

        const newLog = {
            date: getTodayString(),
            reporter: currentUser.name,
            office: office,
            district: dist,
            inspect: ins,
            waste: was,
            holes: hol,
            area: are
        };

        this.logs.push(newLog);
        
        alert(`驗證成功！資料已安全保存至流水帳。\n填報日期：${newLog.date}`);
        // 切換回日曆查詢並顯示剛剛填報的那一天
        this.historyDatePicker.value = newLog.date;
        this.switchTab('history');
    }

    // 🌟 CSV 匯出功能 (取代 Email)
    handleCsvExport() {
        let csvContent = "\uFEFF填報日期,填報人,工程處,行政區,巡查次數(次),廢棄物(噸),填補鼠洞數(個),消毒面積(㎡)\n";
        
        this.logs.forEach(log => {
            csvContent += `${log.date},${log.reporter},${log.office},${log.district},${log.inspect},${log.waste.toFixed(3)},${log.holes},${log.area}\n`;
        });
        
        try {
            const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
            const link = document.createElement("a");
            const url = URL.createObjectURL(blob);
            const timeStamp = new Date().toISOString().slice(0,10).replace(/-/g,"");
            
            link.setAttribute("href", url);
            link.setAttribute("download", `公務流水帳報表_${timeStamp}.csv`);
            link.style.visibility = 'hidden';
            
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            
            if (navigator.vibrate) navigator.vibrate(50);
            alert(`📥 下載成功！\n共匯出 ${this.logs.length} 筆完整歷史軌跡。`);
        } catch (err) {
            console.error(err);
            alert("⚠️ 瀏覽器安全性阻擋了下載操作。");
        }
    }
}

window.addEventListener('DOMContentLoaded', () => {
    window.app = new PestControlSystem();
});