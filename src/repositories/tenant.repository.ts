const tenants = [
  {
    id: "1",
    businessName: "Peluquería Andrea",
    status: "active",
  },
  {
    id: "2",
    businessName: "Ferretería Norte",
    status: "active",
  },
];

export const tenantRepository = {
  async findById(id: string) {
    return tenants.find(t => t.id === id);
  },
};