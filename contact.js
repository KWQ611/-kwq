const form = document.querySelector('#message-form');
const status = document.querySelector('#form-status');
const challenge = document.querySelector('#challenge');
const answer = document.querySelector('#answer');
const a = Math.floor(Math.random() * 5) + 3;
const b = Math.floor(Math.random() * 5) + 2;
challenge.textContent = `${a} + ${b} = ?`;

form.addEventListener('submit', (event) => {
  event.preventDefault();
  status.textContent = '';
  const name = form.elements.name.value.trim();
  const email = form.elements.email.value.trim();
  const message = form.elements.message.value.trim();
  const check = answer.value.trim();
  if (!name || !email || !message) {
    status.textContent = '请先填写姓名、邮箱和留言内容。';
    return;
  }
  if (!form.elements.email.checkValidity()) {
    status.textContent = '请填写有效的邮箱地址。';
    return;
  }
  if (message.length < 10) {
    status.textContent = '留言至少需要 10 个字符。';
    return;
  }
  if (Number(check) !== a + b) {
    status.textContent = '算式答案不对，请再试一次。';
    return;
  }
  const subject = encodeURIComponent(`来自个人主页的留言：${name}`);
  const body = encodeURIComponent(`姓名：${name}\n邮箱：${email}\n\n留言：\n${message}`);
  status.textContent = '验证通过，正在打开邮件应用。请在邮件中点击发送。';
  window.location.href = `mailto:6188099@qq.com?subject=${subject}&body=${body}`;
});

document.querySelectorAll('[data-copy]').forEach((button) => {
  button.addEventListener('click', async () => {
    const value = button.dataset.copy;
    try {
      await navigator.clipboard.writeText(value);
      status.textContent = `已复制 ${button.dataset.label}。`;
    } catch {
      status.textContent = `请手动复制：${value}`;
    }
  });
});
