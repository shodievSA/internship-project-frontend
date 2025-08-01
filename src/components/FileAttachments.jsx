import { useEffect, useRef } from "react";
import { useToast } from "./ui/ToastProvider";
import Button from "./ui/Button";
import { Upload, File, X } from "lucide-react";

function FileAttachments({ fileAttachments, setFileAttachments }) {
	const { showToast } = useToast();
	const fileInputRef = useRef(null);

	useEffect(() => {
		let dragCounter = 0;

		const dropZone = document.getElementById("drop-zone");

		function preventDefaults(event) {
			event.preventDefault();
			event.stopPropagation();
		}

		dropZone.addEventListener("dragenter", (event) => {
			preventDefaults(event);
			dragCounter++;
			dropZone.classList.add("highlight");
		});

		dropZone.addEventListener("dragleave", (event) => {
			preventDefaults(event);
			dragCounter--;
			if (dragCounter === 0) {
				dropZone.classList.remove("highlight");
			}
		});

		dropZone.addEventListener("dragover", preventDefaults);

		dropZone.addEventListener("drop", (event) => {
			preventDefaults(event);
			dragCounter = 0;
			dropZone.classList.remove("highlight");

			const droppedFiles = event.dataTransfer.files;
			addFiles(droppedFiles);
		});
	}, []);

	function addFiles(files) {
		if (files.length > 5) {
			return showToast({
				variant: "failure",
				title: "File limit exceeded!",
				message: "You can upload up to 5 files per task",
			});
		}

		const filesWithId = Array.from(files).map((file) => {
			return {
				id: Date.now() + Math.random(),
				file: file,
			};
		});

		setFileAttachments((prevFiles) => [...prevFiles, ...filesWithId]);
	}

	function handleFileChange(event) {
		const selectedFiles = event.target.files;
		addFiles(selectedFiles);
	}

	function deleteFile(fileIdToDelete) {
		setFileAttachments((prevFiles) =>
			prevFiles.filter((file) => file.id !== fileIdToDelete),
		);
	}

	return (
		<div className="flex flex-col gap-y-4">
			<div
				id="drop-zone"
				className="rounded-md dark:border-neutral-700 border-2 border-dashed 
				p-8"
			>
				<div className="flex flex-col gap-y-3">
					<div className="flex flex-col items-center gap-y-3">
						<Upload className="w-10 h-10 text-neutral-500" />
						<h1 className="text-neutral-500">
							Drag and drop files here, or click to select
						</h1>
					</div>
					<div className="flex flex-col items-center gap-y-3">
						<input
							ref={fileInputRef}
							type="file"
							multiple
							className="hidden"
							onChange={handleFileChange}
						/>
						<Button
							size="md"
							variant="secondary"
							onClick={() => fileInputRef.current.click()}
						>
							Select Files
						</Button>
						<h3 className="text-sm text-neutral-500">
							Supports all file types, max 5MB per file, 5 files
							maximum
						</h3>
					</div>
				</div>
			</div>
			{fileAttachments.length > 0 && (
				<div className="flex flex-col gap-y-3">
					<h1 className="font-medium">
						Attached Files ({fileAttachments.length}/5)
					</h1>
					{fileAttachments.map((file, index) => {
						return (
							<div
								key={index}
								className="flex justify-between items-center rounded-md 
									bg-neutral-100 dark:bg-neutral-900 px-4 py-3"
							>
								<div className="flex items-center gap-x-5">
									<div className="flex gap-x-3">
										<File className="w-5 h-5" />
										<span>{file.file.name}</span>
									</div>
									<span className="text-sm">
										{getMegaBytes(file.file.size)} MB
									</span>
								</div>
								<div
									className="p-1 hover:bg-red-700 dark:hover:bg-red-900 hover:text-white 
											rounded-md transition-[all] duration-200 cursor-pointer"
									onClick={() => deleteFile(file.id)}
								>
									<X className="w-4 h-4" />
								</div>
							</div>
						);
					})}
				</div>
			)}
		</div>
	);
}

function getMegaBytes(bytes) {
	return (bytes / (1024 * 1024)).toFixed(2);
}

export default FileAttachments;
