"use client";
import { useState, useEffect } from "react";
import { ProductCard } from "@/components/ProductCard";
import { AuthProvider } from "@/context/AuthContext";
import { PortfolioItem } from "@/app/api/addItem/data_types";
import { fetchPortfolio } from "@/app/api/functions/dbFunctions";
import AddPicForm from "@/components/AddPicForm";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { CgArrowsV } from "react-icons/cg";

interface Picture extends PortfolioItem {
  position: number;
  imgurl: string;
}

interface SortableItemProps {
  id: string;
  product: Picture;
  isEditMode: boolean;
  onDelete: (id: string) => void;
  onSelect: (product: Picture) => void;
  isSelected: boolean;
}

const SortableItem = ({
  id,
  product,
  isEditMode,
  onDelete,
  onSelect,
  isSelected,
}: SortableItemProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 1 : 0,
  };

  const fallbackImage = "https://via.placeholder.com/320x480";

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="relative group break-inside-avoid mb-4"
    >
      {isEditMode && (
        <div
          {...attributes}
          {...listeners}
          className="absolute top-2 right-2 z-10 bg-black bg-opacity-50 p-2 rounded-full cursor-move opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <CgArrowsV className="text-white text-xl" />
        </div>
      )}
      <ProductCard
        product={{
          ...product,
          imgurl: product.imgurl?.startsWith("http")
            ? product.imgurl
            : fallbackImage,
        }}
        onDelete={onDelete}
        onSelect={onSelect}
        isSelected={isSelected}
      />
    </div>
  );
};

export default function Page() {
  const [portfolioData, setPortfolioData] = useState<Picture[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Picture | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const loadPortfolio = async () => {
    setLoading(true);
    const data = await fetchPortfolio();
    const sortedData = data
      .map((item: PortfolioItem, index: number) => ({
        ...item,
        position: (item as Picture).position || index,
      }))
      .sort((a: Picture, b: Picture) => a.position - b.position);
    setPortfolioData(sortedData);
    setLoading(false);
  };

  useEffect(() => {
    loadPortfolio();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/deleteItem/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        console.log("Item deleted successfully");
        await loadPortfolio();
      } else {
        const errorText = await response.text();
        console.error("Error deleting item:", errorText);
      }
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || active.id === over.id) {
      return;
    }

    setPortfolioData((items) => {
      const oldIndex = items.findIndex((item) => item.id === active.id);
      const newIndex = items.findIndex((item) => item.id === over.id);

      return arrayMove(items, oldIndex, newIndex).map((item, index) => ({
        ...item,
        position: index,
      }));
    });
  };

  const savePositions = async () => {
    try {
      const response = await fetch("/api/updatePositions", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(
          portfolioData.map((item, index) => ({
            id: item.id,
            position: index,
          })),
        ),
      });

      if (response.ok) {
        setIsEditMode(false);
        await loadPortfolio();
      } else {
        console.error("Failed to update positions");
      }
    } catch (error) {
      console.error("Error updating positions:", error);
    }
  };

  const handleRefresh = async () => {
    loadPortfolio();
  };
  const handleSelectItem = (product: Picture) => {
    setSelectedItem(selectedItem?.id === product.id ? null : product);
  };

  const handleClearSelection = () => {
    setSelectedItem(null);
  };

  return (
    <AuthProvider>
      <div className="justify-center flex flex-col bg-slate-300 max-w-3xl">
        <div className="flex justify-between p-4">
          <button
            onClick={handleRefresh}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            Refresh Data
          </button>
          <div>
            <button
              onClick={() => setIsEditMode(!isEditMode)}
              className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition-colors mr-2"
            >
              {isEditMode ? "Cancel Edit" : "Edit Mode"}
            </button>
            {isEditMode && (
              <button
                onClick={savePositions}
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
              >
                Save Order
              </button>
            )}
          </div>
        </div>

        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <div className="xxs:columns-1 xxs:mx-0 xs:columns-1 xs:mx-0 s:columns-2 md:columns-3 lg:columns-4 gap-0 mx-0">
            <SortableContext
              items={portfolioData.map((item) => item.id)}
              strategy={rectSortingStrategy}
            >
              {portfolioData.map((product) => (
                <SortableItem
                  key={product.id}
                  id={product.id}
                  product={product}
                  isEditMode={isEditMode}
                  onDelete={handleDelete}
                  onSelect={handleSelectItem}
                  isSelected={selectedItem?.id === product.id}
                />
              ))}
            </SortableContext>
          </div>
        </DndContext>
      </div>
      <AddPicForm
        onSave={handleRefresh}
        selectedItem={selectedItem}
        onClearSelection={() => setSelectedItem(null)}
      />
    </AuthProvider>
  );
}
