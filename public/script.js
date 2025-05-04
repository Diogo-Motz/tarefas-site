document.addEventListener('DOMContentLoaded', () => {
    console.log("✅ Aplicação iniciada");
    
    // Elementos do DOM
    const formulario = document.getElementById('formularioTarefa');
    const btnNovaTarefa = document.getElementById('btnNovaTarefa');
  
    // Botão Nova Tarefa
    btnNovaTarefa.addEventListener('click', () => {
      formulario.reset();
      console.log("📝 Modo de criação de nova tarefa");
    });
  
    // Submit do Formulário
    formulario.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const dados = {
        titulo: document.getElementById('titulo').value,
        descricao: document.getElementById('descricao').value,
        responsavel: document.getElementById('responsavel').value,
        prioridade: document.getElementById('prioridade').value,
        status: document.getElementById('status').value,
        inicio: document.getElementById('inicio').value,
        fim: document.getElementById('fim').value
      };
  
      try {
        const resposta = await fetch('/tarefas', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(dados)
        });
  
        if (!resposta.ok) throw new Error('Erro ao salvar tarefa');
        
        alert('✅ Tarefa criada com sucesso!');
        formulario.reset();
        await carregarTarefas();
      } catch (erro) {
        console.error("❌ Erro:", erro);
        alert('❌ Erro ao salvar tarefa');
      }
    });
  
    // Carrega tarefas ao iniciar
    carregarTarefas();
  });
  
  // Função para carregar tarefas
  async function carregarTarefas() {
    try {
      console.log("🔍 Carregando tarefas...");
      const resposta = await fetch('/tarefas');
      
      if (!resposta.ok) throw new Error('Erro ao carregar tarefas');
      
      const tarefas = await resposta.json();
      console.log("📋 Tarefas recebidas:", tarefas);
      
      const lista = document.getElementById('listaTarefas');
      lista.innerHTML = '';
  
      if (!tarefas || tarefas.length === 0) {
        lista.innerHTML = '<div class="list-group-item">Nenhuma tarefa cadastrada</div>';
        return;
      }
  
      tarefas.forEach(tarefa => {
        const item = document.createElement('div');
        item.className = `list-group-item ${getPriorityClass(tarefa.prioridade)}`;
        
        item.innerHTML = `
          <div class="d-flex justify-content-between align-items-start">
            <div class="me-3">
              <h5>${tarefa.titulo}</h5>
              <p class="mb-1">${tarefa.descricao || 'Sem descrição'}</p>
              <small class="text-muted">
                <strong>Responsável:</strong> ${tarefa.responsavel || 'Não definido'} | 
                <strong>Status:</strong> ${formatStatus(tarefa.status)} | 
                <strong>Prioridade:</strong> ${tarefa.prioridade}
              </small>
            </div>
            <div>
              <button class="btn btn-sm btn-outline-danger" 
                onclick="excluirTarefa('${tarefa.id}')">
                🗑️ Excluir
              </button>
            </div>
          </div>
        `;
        
        lista.appendChild(item);
      });
    } catch (erro) {
      console.error("❌ Erro ao carregar tarefas:", erro);
      document.getElementById('listaTarefas').innerHTML = `
        <div class="list-group-item text-danger">
          Erro ao carregar tarefas. Recarregue a página.
        </div>
      `;
    }
  }
  
  // Função para excluir tarefa
  window.excluirTarefa = async function(id) {
    if (!confirm('Tem certeza que deseja excluir esta tarefa?')) return;
  
    try {
      console.log(`🗑️ Tentando excluir tarefa ID: ${id}`);
      const resposta = await fetch(`/tarefas/${id}`, {
        method: 'DELETE'
      });
  
      if (!resposta.ok) throw new Error('Erro ao excluir');
      
      alert('🗑️ Tarefa excluída com sucesso!');
      await carregarTarefas();
    } catch (erro) {
      console.error('❌ Erro ao excluir tarefa:', erro);
      alert('❌ Erro ao excluir tarefa');
    }
  };
  
  // Funções auxiliares
  function getPriorityClass(prioridade) {
    return {
      alta: 'prioridade-alta',
      media: 'prioridade-media',
      baixa: 'prioridade-baixa'
    }[prioridade] || '';
  }
  
  function formatStatus(status) {
    return {
      'nao iniciada': 'Não Iniciada',
      'iniciada': 'Iniciada',
      'concluida': 'Concluída'
    }[status] || status;
  }