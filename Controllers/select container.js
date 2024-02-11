let selectedContainer = null;

function changeColor(container) { 
    if (selectedContainer) {
        selectedContainer.classList.remove('selected');
    }

    if (container !== selectedContainer) {
        container.classList.add('selected');
        selectedContainer = container;
    } else {
        selectedContainer = null;
    }
}

function hoverEffect(container) {
    if (container !== selectedContainer) {
        container.classList.add('hovered');
    }
}

function removeHoverEffect(container) {
    container.classList.remove('hovered');
}