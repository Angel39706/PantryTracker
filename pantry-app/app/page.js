'use client'
import { Box, TextField, Typography, Stack, Chip, Button, Modal } from '@mui/material';
import { useInventory } from './inventoryController';

export default function Home() {
  const {
    inventory,
    open,
    searchModalOpen,
    itemName,
    setItemName,
    itemQuantity,
    setItemQuantity,
    searchQuery,
    setSearchQuery,
    handleOpen,
    handleClose,
    handleAddItem,
    handleRemoveItem,
    handleSearchOpen,
    handleSearchClose
  } = useInventory();

  return (
    <Box
      width="100vw"
      height="100vh"
      display="flex"
      flexDirection="column"
      alignItems="center"
      bgcolor="#282C35"
      color="#ffffff"
      padding={2}
    >
      {/* Modal for adding new item */}
      <Modal open={open} onClose={handleClose}>
        <Box
          position="absolute"
          top="50%"
          left="50%"
          width={{ xs: '90%', sm: 400 }}
          bgcolor="#444"
          color="#ffffff"
          border="none"
          boxShadow={24}
          borderRadius={2}
          p={4}
          display="flex"
          flexDirection="column"
          gap={3}
          sx={{
            transform: 'translate(-50%,-50%)',
          }}
        >
          <Typography variant="h6">Add Item</Typography>
          <TextField
            variant="outlined"
            fullWidth
            label="Item Name"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            InputProps={{
              style: {
                color: '#ffffff',
              },
            }}
            sx={{ input: { color: '#ffffff' }, label: { color: '#ffffff' } }}
          />
          <TextField
            variant="outlined"
            fullWidth
            label="Quantity"
            type="number"
            value={itemQuantity}
            onChange={(e) => setItemQuantity(Number(e.target.value))}
            InputProps={{
              style: {
                color: '#ffffff',
              },
            }}
            sx={{ input: { color: '#ffffff' }, label: { color: '#ffffff' } }}
          />
          <Button
            variant="contained"
            onClick={() => {
              handleAddItem(itemName, itemQuantity);
              setItemName('');
              setItemQuantity(1);
              handleClose();
            }}
            sx={{
              backgroundColor: '#61dafb',
              color: '#282C35',
              borderRadius: 2,
              '&:hover': {
                backgroundColor: '#21a1f1',
              },
            }}
          >
            Add
          </Button>
        </Box>
      </Modal>

      {/* Modal for search */}
      <Modal open={searchModalOpen} onClose={handleSearchClose}>
        <Box
          position="absolute"
          top="50%"
          left="50%"
          width={{ xs: '90%', sm: 400 }}
          bgcolor="#444"
          color="#ffffff"
          border="none"
          boxShadow={24}
          borderRadius={2}
          p={4}
          display="flex"
          flexDirection="column"
          gap={3}
          sx={{
            transform: 'translate(-50%,-50%)',
          }}
        >
          <Typography variant="h6">Search Items</Typography>
          <TextField
            variant="outlined"
            fullWidth
            label="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              style: {
                color: '#ffffff',
              },
            }}
            sx={{ input: { color: '#ffffff' }, label: { color: '#ffffff' } }}
          />
          <Button
            variant="contained"
            onClick={() => handleSearchClose()}
            sx={{
              backgroundColor: '#61dafb',
              color: '#282C35',
              borderRadius: 2,
              '&:hover': {
                backgroundColor: '#21a1f1',
              },
            }}
          >
            Search
          </Button>
        </Box>
      </Modal>

      {/* Header and Chips */}
      <Box
        width="100%"
        maxWidth="900px"
        display="flex"
        flexDirection="column"
        alignItems="center"
        mb={4}
      >
        <Box
          width="100%"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
        >
          <Typography variant="h2" color="#ffffff">
            Pantry Items
          </Typography>
          <Box display="flex" gap={2} alignItems="center">
            <Chip
              label="Search"
              onClick={handleSearchOpen}
              sx={{
                backgroundColor: '#444444',
                color: '#ffffff',
                cursor: 'pointer',
                '&:hover': {
                  color: '#000000',
                  backgroundColor: '#e0e0e0',
                },
              }}
            />
            <Chip
              label="New Item"
              onClick={handleOpen}
              sx={{
                backgroundColor: '#444444',
                color: '#ffffff',
                cursor: 'pointer',
                '&:hover': {
                  color: '#000000',
                  backgroundColor: '#e0e0e0',
                },
              }}
            />
          </Box>
        </Box>

        {/* Inventory List */}
        <Box
          width={{ xs: '100%', sm: '90%', md: '80%', lg: '70%' }}
          border="none"
        >
          <Stack
            width="100%"
            spacing={1}
            overflow="auto"
            sx={{ maxHeight: { xs: 'auto', md: '300px' } }}
          >
            {inventory.map(({ name, quantity }) => (
              <Box
                key={name}
                width="100%"
                minHeight="150px"
                display="flex"
                flexDirection={{ xs: 'column', sm: 'row' }}
                alignItems="center"
                justifyContent="space-between"
                bgcolor="#555"
                padding={2}
                borderRadius={2}
                boxShadow={3}
              >
                <Typography variant="h5" color="#ffffff" textAlign="center" textTransform="capitalize">
                  {name}
                </Typography>
                <Box display="flex" alignItems="center" gap={2}>
                  <Button
                    variant="contained"
                    onClick={() => handleRemoveItem(name)}
                    sx={{
                      backgroundColor: '#e57373',
                      color: '#ffffff',
                      '&:hover': {
                        backgroundColor: '#d32f2f',
                      },
                    }}
                  >
                    -
                  </Button>
                  <Typography variant="h5" color="#ffffff" textAlign="center">
                    {quantity}
                  </Typography>
                  <Button
                    variant="contained"
                    onClick={() => handleAddItem(name, 1)}
                    sx={{
                      backgroundColor: '#81c784',
                      color: '#ffffff',
                      '&:hover': {
                        backgroundColor: '#388e3c',
                      },
                    }}
                  >
                    +
                  </Button>
                </Box>
              </Box>
            ))}
          </Stack>
        </Box>
      </Box>
    </Box>
  );
}
