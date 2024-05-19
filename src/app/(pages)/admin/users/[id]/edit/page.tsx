import AdminUsersEditCard from "@/components/admin/users/edit/AdminUsersEditCard";
import React from "react";

function AdminUsersEditPage({ params }: { params: { id: string } }) {
  return (
    <div>
      <AdminUsersEditCard id={params.id} />
    </div>
  );
}

export default AdminUsersEditPage;
