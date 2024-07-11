export function checkMobile(selectedView) {
  if (window.innerWidth < 768) {
    selectedView.value = "grid";
  }
}

export function manageResizeEvent(selectedView, onMounted, onUnmounted) {
  onMounted(() => {
    window.addEventListener("resize", () => checkMobile(selectedView));
    checkMobile(selectedView);
  });

  onUnmounted(() => {
    window.removeEventListener("resize", () => checkMobile(selectedView));
  });
}
