(function(){
  function getSession(){
    try { return JSON.parse(localStorage.getItem('bp_session') || 'null'); } catch { return null; }
  }
  function dataKey(email){ return `bp_data_${email}`; }
  function getUserData(email){
    try { return JSON.parse(localStorage.getItem(dataKey(email)) || '{"entries":[]}'); } catch { return { entries: [] }; }
  }
  function setUserData(email, data){
    localStorage.setItem(dataKey(email), JSON.stringify(data));
  }
  function currency(n){
    const v = Number(n || 0);
    return v.toLocaleString(undefined, { style: 'currency', currency: 'USD' });
  }

  function render(){
    const session = getSession();
    if(!session || !session.email){ return; }
    const data = getUserData(session.email);
    const entries = data.entries || [];

    let totalIncome = 0;
    let totalExpense = 0;
    for(const entry of entries){
      if(entry.type === 'income') totalIncome += Number(entry.amount || 0);
      else totalExpense += Number(entry.amount || 0);
    }
    const balance = totalIncome - totalExpense;

    const totalIncomeEl = document.getElementById('totalIncome');
    const totalExpenseEl = document.getElementById('totalExpense');
    const balanceEl = document.getElementById('balance');
    if(totalIncomeEl) totalIncomeEl.textContent = currency(totalIncome);
    if(totalExpenseEl) totalExpenseEl.textContent = currency(totalExpense);
    if(balanceEl) balanceEl.textContent = currency(balance);

    const tbody = document.getElementById('entriesTbody');
    if(!tbody) return;
    const filterSelect = document.getElementById('filterType');
    const filterValue = filterSelect ? filterSelect.value : 'all';

    tbody.innerHTML = '';
    const filtered = entries.filter(e => filterValue === 'all' ? true : e.type === filterValue);
    for(const entry of filtered){
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${entry.date}</td>
        <td><span class="badge ${entry.type}">${entry.type}</span></td>
        <td>${entry.category || ''}</td>
        <td>${entry.description || ''}</td>
        <td class="right">${currency(entry.amount)}</td>
        <td class="right">
          <div class="actions">
            <button class="link" data-action="delete" data-id="${entry.id}">Delete</button>
          </div>
        </td>
      `;
      tbody.appendChild(tr);
    }
  }

  function addEntry(e){
    e.preventDefault();
    const session = getSession();
    if(!session || !session.email) return;
    const data = getUserData(session.email);

    const type = document.getElementById('type').value;
    const category = document.getElementById('category').value.trim();
    const description = document.getElementById('description').value.trim();
    const amount = parseFloat(document.getElementById('amount').value);
    const date = document.getElementById('date').value;

    if(!date || !isFinite(amount) || amount < 0){
      alert('Please provide a valid date and non-negative amount.');
      return;
    }

    const entry = {
      id: `${Date.now()}_${Math.random().toString(36).slice(2,8)}`,
      type, category, description, amount, date
    };

    data.entries.unshift(entry);
    setUserData(session.email, data);

    document.getElementById('entryForm').reset();
    render();
  }

  function onTableClick(e){
    const target = e.target;
    if(!(target instanceof HTMLElement)) return;
    const action = target.getAttribute('data-action');
    const id = target.getAttribute('data-id');
    if(action === 'delete' && id){
      const session = getSession();
      if(!session || !session.email) return;
      const data = getUserData(session.email);
      data.entries = (data.entries || []).filter(en => en.id !== id);
      setUserData(session.email, data);
      render();
    }
  }

  window.addEventListener('DOMContentLoaded', function(){
    const form = document.getElementById('entryForm');
    if(form){ form.addEventListener('submit', addEntry); }
    const tbody = document.getElementById('entriesTbody');
    if(tbody){ tbody.addEventListener('click', onTableClick); }
    const filter = document.getElementById('filterType');
    if(filter){ filter.addEventListener('change', render); }
    render();
  });
})();


