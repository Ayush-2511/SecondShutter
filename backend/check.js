const supabase = require('./supabase');

async function checkUsers() {
  const { data, error } = await supabase.from('users').select('*');
  console.log(data);
}
checkUsers();
