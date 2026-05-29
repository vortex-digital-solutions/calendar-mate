function hasRequiredFields(appointment) {
  return (
    appointment &&
    appointment.id !== undefined &&
    appointment.id !== null &&
    appointment.start !== undefined &&
    appointment.start !== null &&
    appointment.end !== undefined &&
    appointment.end !== null
  );
}

function createCalendarStore(initialAppointments = []) {
  const items = [...initialAppointments];

  function list() {
    return items.slice();
  }

  function add(appointment) {
    if (!hasRequiredFields(appointment)) {
      throw new TypeError('appointment must include id, start, and end');
    }

    items.push(appointment);
    return appointment;
  }

  function move(id, updates) {
    const index = items.findIndex((item) => item.id === id);
    if (index === -1) return null;

    const next = { ...items[index], ...updates };
    if (!hasRequiredFields(next)) {
      throw new TypeError('appointment must include id, start, and end');
    }

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
