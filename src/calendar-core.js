function createCalendarStore(initialAppointments = []) {
  const items = [...initialAppointments];

  function list() {
    return items.slice();
  }

  function add(appointment) {
    if (!appointment || appointment.id == null || appointment.start == null || appointment.end == null) {
      throw new TypeError('appointment must include id, start, and end');
    }

    items.push(appointment);
    return appointment;
  }

  function move(id, updates) {
    const index = items.findIndex((item) => item.id === id);
    if (index === -1) return null;

    const next = { ...items[index], ...updates };
    items[index] = next;
    return next;
  }

  function remove(id) {
    const index = items.findIndex((item) => item.id === id);
    if (index === -1) return false;
    items.splice(index, 1);
    return true;
  }

  return { list, add, move, remove };
}

module.exports = { createCalendarStore };
