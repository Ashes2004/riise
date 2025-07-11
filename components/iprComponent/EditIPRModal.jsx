"use client";
import React, { useState, useEffect } from "react";
import Modal from "../researchComponent/Modal";

const EditIPRModal = ({ isOpen, onClose, iprData, onSubmit }) => {
  const [formData, setFormData] = useState(iprData || {});

  useEffect(() => {
    setFormData(iprData || {});
  }, [iprData]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = () => {
    onSubmit(formData);
  };

  if (!isOpen || !formData) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Edit IPR">
      <div className="space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title || ""}
          onChange={handleChange}
          className="w-full p-2 bg-gray-800 rounded text-white"
        />

        {/* Dropdown for IPR Type */}
        <select
          name="ipr_type"
          value={formData.ipr_type || ""}
          onChange={handleChange}
          className="w-full p-2 bg-gray-800 rounded text-white"
        >
          <option value="">Select IPR Type</option>
          <option value="Patent">Patent</option>
          <option value="Copyright">Copyright</option>
          <option value="Trademark">Trademark</option>
          <option value="Design">Design</option>
        </select>

        <input
          type="text"
          name="ipr_number"
          placeholder="IPR Number"
          value={formData.ipr_number || ""}
          onChange={handleChange}
          className="w-full p-2 bg-gray-800 rounded text-white"
        />

        {/* Dropdown for Status */}
        <select
          name="status"
          value={formData.status || ""}
          onChange={handleChange}
          className="w-full p-2 bg-gray-800 rounded text-white"
        >
          <option value="">Select Status</option>
          <option value="Pending">Pending</option>
          <option value="Granted">Granted</option>
          <option value="Rejected">Rejected</option>
          <option value="Published">Published</option>
        </select>

        <button
          onClick={handleSubmit}
          className="px-4 py-2 bg-blue-600 rounded text-white"
        >
          Update IPR
        </button>
      </div>
    </Modal>
  );
};

export default EditIPRModal;
